/* import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';

// Define the props interface
interface EditorProps {
  readOnly: boolean;
  defaultValue: string;
  onTextChange: (delta: any, oldDelta: any, source: string) => void;
  onSelectionChange: (range: any, oldRange: any, source: string) => void;
}

// Define the ref type for Quill
type EditorRef = Quill | null;

const Editor2 = forwardRef<EditorRef, EditorProps>(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    // Update refs when props change
    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    }, [onTextChange, onSelectionChange]);

    // Enable/disable editor based on readOnly prop
    useEffect(() => {
      if (ref && ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );
      
      const quill = new Quill(editorContainer, {
        theme: 'snow',
      });

      if (ref) ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        if (ref) ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  }
);

// Ensure displayName is set for debugging purposes
Editor2.displayName = 'Editor';

export default Editor2;
 */