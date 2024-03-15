import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [
      {
        color: [
          '#1abc9c',
          '#2ecc71',
          '#3498db',
          '#9b59b6',
          '#000000d9',
          '#16a085',
          '#27ae60',
          '#2980b9',
          '#8e44ad',
          '#2c3e50',
          '#f1c40f',
          '#e67e22',
          '#e74c3c',
          '#ecf0f1',
          '#95a5a6',
          '#f39c12',
          '#d35400',
          '#c0392b',
          '#bdc3c7',
          '#7f8c8d',
          '#34495e',
        ],
      },
    ],
    ['link'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ],
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
];

const TextEditor = ({ value, onChange, placeholder, disabled, className }: any) => (
  <ReactQuill
    theme='snow'
    modules={modules}
    formats={formats}
    value={value || ''}
    onChange={onChange}
    placeholder={placeholder}
    readOnly={disabled}
    className={className}
  />
);

export default TextEditor;
