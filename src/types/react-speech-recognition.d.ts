declare module "react-speech-recognition" {
  export interface SpeechRecognitionOptions {
    commands?: Array<{
      command: string | string[];
      callback: (...args) => void;
      isFuzzyMatch?: boolean;
      fuzzyMatchingThreshold?: number;
      bestMatchOnly?: boolean;
    }>;
    continuous?: boolean;
    language?: string;
    interimResults?: boolean;
    autoStart?: boolean;
  }

  export interface Transcript {
    transcript: string;
    interimTranscript: string;
    finalTranscript: string;
    browserSupportsSpeechRecognition: boolean;
    listening: boolean;
  }

  export function useSpeechRecognition(options?: SpeechRecognitionOptions): Transcript;

  export function startListening(options?: SpeechRecognitionOptions): void;
  export function stopListening(): void;
}
