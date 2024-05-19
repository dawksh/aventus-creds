import { useState } from "react";
import styles from "../styles/UploadForm.module.css";
import { useAccount, useWriteContract } from "wagmi";
import { abi } from "@/utils/lib";
import axios from "axios";
import toast from "react-hot-toast";

const UploadForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('uploading to IPFS');

  const { writeContractAsync } = useWriteContract()

  const { isConnected, address } = useAccount();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log((new Date(date)).getTime())
    if (!isConnected) {
      toast.error("Please Connect wallet first");
      return
    }

    if (!image || !title || !recipient || !description) {
      toast.error("Please enter all fields");
      return
    }

    setLoading(true);
    setLoadingText('saving credential to ipfs');

    const { data } = await axios.post("/api/upload_ipfs", {
      title, description, image: imagePreview, issuer: address
    })

    setLoadingText('minting on blockchain');

    const tx = await writeContractAsync({
      abi,
      address: "0xb2817eB9d059ECfB9da34aD157C72F9860FcEaB6",
      functionName: 'mintToken',
      args: [
        recipient,
        `ipfs://${data.metadata}`
      ]
    })

    toast.success(`Credential created successfully with TxHash: ${tx}`)

    setLoadingText('saving details');

    await axios.post("/api/create_credential", {
      image_cid: data.image, title, recipient_address: recipient, description, issuer_address: address, date
    })

    window.location.href = '/';

  };

  if (loading) {
    return (
      <center>
        <div className="text-center mb-2  ">
          <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <center><span className="opacity-40 mt-5">{loadingText}</span></center>
      </center>
    );
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.formHead}>Create Credential</h1>
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>
            Image
          </label>
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
              <button
                type="button"
                onClick={handleCancelUpload}
                className={styles.cancelButton}
              >
                Cancel Upload
              </button>
            </div>
          )}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className={styles.imagePreview}
            />
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Aventus Certificate"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="recipient" className={styles.label}>
            Recipient
          </label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x34b...45"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${styles.input} ${styles.textarea}`}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="date" className={styles.label}>
            Expiry Date (Optional)
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`${styles.input} ${styles.textarea}`}
          />
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
