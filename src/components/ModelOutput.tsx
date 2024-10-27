import React from 'react';

interface ModelOutputProps {
  response: {
    text: string;
    image_output?: string;
    voice_output?: string;
  };
}

export const ModelOutput: React.FC<ModelOutputProps> = ({ response }) => {
  return (
    <div className="mt-8 bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Model Output</h2>
      
      <div className="space-y-4">
        {response.text && (
          <div>
            <h3 className="text-lg font-medium mb-2">Text Response</h3>
            <p className="text-gray-300 whitespace-pre-wrap">{response.text}</p>
          </div>
        )}

        {response.image_output && (
          <div>
            <h3 className="text-lg font-medium mb-2">Generated Image</h3>
            <img
              src={response.image_output}
              alt="Generated output"
              className="max-w-full rounded-lg"
            />
          </div>
        )}

        {response.voice_output && (
          <div>
            <h3 className="text-lg font-medium mb-2">Generated Audio</h3>
            <audio controls className="w-full">
              <source src={response.voice_output} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};