

import { useState } from 'react';
import styles from '../styles/UploadForm.module.css';

const UploadForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImageUploaded(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelUpload = () => {
    setImage(null);
    setImagePreview(null);
    setImageUploaded(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log({ image, title, recipient, description });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.formHead} >     Create Credential</h1>
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.input}
          />
          {imageUploaded && (
            <div className={styles.imageControls}>
              <span className={styles.uploaded}>Image Uploaded</span>
              <button type="button" onClick={handleCancelUpload} className={styles.cancelButton}>
                Cancel Upload
              </button>
            </div>
          )}
          {imagePreview && <img src={imagePreview} alt="Preview" className={styles.imagePreview} />}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Aventus Certificate'
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="recipient" className={styles.label}>Recipient</label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder='0x34b...45'
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <textarea
            id="description"
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${styles.input} ${styles.textarea}`}
          />
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default UploadForm;
