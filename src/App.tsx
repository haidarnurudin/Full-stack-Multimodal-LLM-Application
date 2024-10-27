import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Mic, FileText, Image, Loader2, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { FileUpload } from './components/FileUpload';
import { AudioRecorder } from './components/AudioRecorder';
import { ModelOutput } from './components/ModelOutput';
import { TextInput } from './components/TextInput';

interface ModelResponse {
  text: string;
  image_output?: string;
  voice_output?: string;
}

function App() {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ModelResponse | null>(null);

  const handleSubmit = async () => {
    if (!text && !image && !audio) {
      toast.error('Please provide at least one input (text, image, or voice)');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    
    if (text) formData.append('text', text);
    if (image) formData.append('image', image);
    if (audio) formData.append('audio', audio);

    try {
      const res = await fetch('http://localhost:8000/process', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to process inputs');
      
      const data = await res.json();
      setResponse(data);
      toast.success('Processing complete!');
    } catch (error) {
      toast.error('Error processing inputs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Multimodal LLM</h1>
          <p className="text-gray-400">Process text, images, and voice inputs using our enhanced language model</p>
        </header>

        <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-6">
          <div className="grid gap-6">
            <TextInput 
              value={text}
              onChange={setText}
              placeholder="Enter your text here..."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUpload
                file={image}
                onFileSelect={(file) => setImage(file)}
                accept="image/*"
                icon={<Image className="w-6 h-6" />}
                label="Upload Image"
              />

              <AudioRecorder
                onRecordingComplete={(blob) => setAudio(blob)}
                icon={<Mic className="w-6 h-6" />}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Process Inputs
                </>
              )}
            </button>
          </div>

          {response && <ModelOutput response={response} />}
        </div>
      </div>
    </div>
  );
}

export default App;