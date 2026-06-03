import React, { useState, useRef } from 'react';
import styles from './PersonalInfo.module.css';
import baseAvatar from './../../../images/avatar.png';
import editIcon from './../../../images/edit.svg';
import Loader from './../../common/Loader/Loader'
import { API_URL } from '../../../utils/constants';

const PersonalInfo = ({ user, onUpdate, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [oldFormData, setOldFormData] = useState({...user});
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const avatarRef = useRef(null)
  const fileInputRef = useRef(null);
  const imgAvatar = avatarRef.current;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone ? Number(formData.phone) : null,
        age: formData.age ? Number(formData.age) : null,
        gender: formData.gender,
        avatar: formData.avatar || null,
    };
    await onUpdate(data);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(oldFormData);
    setIsEditing(false);
    imgAvatar.src = formData.avatar ? `${API_URL}/users/avatar/${formData.avatar}` : baseAvatar
  };

  const handleEdit = () => {
    setFormData({ ...user });
    setOldFormData({...user});
    setIsEditing(true);
  };

  const handleAvatarClick = () => {
    if (isEditing) fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
        setSelectedFile(file);
        };
        reader.readAsDataURL(file);
        const previewUrl = URL.createObjectURL(file);
        imgAvatar.src = previewUrl;
    }
  };

  if (!user || isLoading) return <Loader />

  return (
    <article className={styles.personal}>
        <div className={styles.personal__container}>
            <img ref={avatarRef} src={formData.avatar ? `${API_URL}/users/avatar/${formData.avatar}` : baseAvatar} 
            alt="avatar" className={styles.personal__avatar} />
            <div className={`${styles.personal__overlay} ${isEditing ? styles.personal__overlay_editable : ''}`}
                onClick={isEditing ? handleAvatarClick : undefined}
            >
                <img className={styles.personal__icon_edit} src={editIcon} alt='edit' />
            </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleAvatarChange}
            />
        </div>
        <h2 className={styles.personal__heading}>Personal information</h2>
        <form className={styles.personal__form} onSubmit={handleSubmit}>
            {['name', 'email', 'phone', 'age', 'gender'].map(field => (
            <label key={field} className={`${styles.personal__field} ${isEditing ? styles.personal__field__active : ''}`}>
                <span className={`${styles.personal__label} ${isEditing ? styles.personal__label_active : ''}`}>
                {field}
                </span>
                <input
                    type={field === 'email' ? 'email' : field === 'age' ? 'number' : field === 'phone' ? 'number' : 'text'}
                    name={field}
                    value={isEditing ? formData[field] : user[field]}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                    className={`${styles.personal__input} ${isEditing ? styles.personal__input_editable : ''}`}
                />
            </label>
            ))}
            {isEditing ? (
                <div className={styles.personal__actions}>
                    <button type="submit" disabled={isSaving} onClick={handleSubmit}
                    className={`${styles.personal__button} ${isSaving ? styles.personal__button_saving : ''}`}>
                    {isSaving ? 'Saving...' : 'Save changes'}
                    </button>
                    <button className={`${styles.personal__button} ${styles.personal__button_cancel}`}
                    disabled={isSaving}  onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <button type="button" className={`${styles.personal__button} ${styles.personal__button_edit}`} onClick={handleEdit}>Edit</button>
            )}
        </form>
        </article>
    );
};

export default PersonalInfo;
