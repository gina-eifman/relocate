import React, { useState, useRef } from 'react';
import styles from './PersonalInfo.module.css';
import baseAvatar from './../../../images/avatar.png';
import editIcon from './../../../images/edit.svg';
import Loader from './../../common/Loader/Loader';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import { AVATAR_ERR, MAX_AVATAR_SIZE } from '../../../utils/constants';

const PersonalInfo = ({ user, onUpdate, isLoading, errMessage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [oldFormData, setOldFormData] = useState({ ...user });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const form = evt.target.closest("form");
    setErrors(prev => ({ ...prev, [name]: '' }));
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: evt.target.validationMessage }));        
    const formValid = form.checkValidity()
    const avatarValid = !errors.avatar;
    setIsValid(formValid && avatarValid);
  };

const handleSubmit = async (evt) => {
  evt.preventDefault();
  setErrors({});
  setIsSaving(true);
  const data = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone ? Number(formData.phone) : null,
    age: formData.age ? Number(formData.age) : null,
    gender: formData.gender,
    avatar: formData.avatar || '',
  };
  try {
    await onUpdate(data);
    setIsEditing(false);
    setErrors({});
  } catch (err) {
    console.error('Update error:', err);
    setErrors(prev => ({ ...prev, general: errMessage }));
  } finally {
    setIsSaving(false);
  }
};

  const handleCancel = () => {
    setFormData({ ...oldFormData });
    setIsEditing(false);
    setErrors({});
  };

  const handleEdit = () => {
    setFormData({ ...user });
    setOldFormData({ ...user });
    setIsEditing(true);
  };

  const handleAvatarClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const file = evt.target.files[0];
    if (file) {
      if (file.size > MAX_AVATAR_SIZE) {
        setErrors(prev => ({
          ...prev,
          avatar: AVATAR_ERR
        }));
        setIsValid(false);
        evt.target.value = '';
        return;
      }
      setErrors(prev => ({ ...prev, avatar: '' }));
      setIsValid(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user || isLoading) return <Loader />;

  return (
    <article className={styles.personal}>
      <div className={styles.personal__container}>
        <img
          src={ 
            isEditing && formData.avatar
            ? formData.avatar
            : (user?.avatar || baseAvatar
          )}
          alt="avatar"
          className={styles.personal__avatar}
        />
        <div
          className={`${styles.personal__overlay} ${isEditing ? styles.personal__overlay_editable : ''}`}
          onClick={isEditing ? handleAvatarClick : undefined}
        >
          <img className={styles.personal__icon_edit} src={editIcon} alt="edit" />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleAvatarChange}
          name="avatar"
        />
        <ErrorMessage message={errors.avatar} />
      </div>
      <h2 className={styles.personal__heading}>Personal information</h2>
      <form className={styles.personal__form} onSubmit={handleSubmit}>
        {['name', 'email', 'phone', 'age', 'gender'].map((field) => (
          <label
            key={field}
            className={`${styles.personal__field} ${isEditing ? styles.personal__field__active : ''}`}
          >
            <span className={`${styles.personal__label} ${isEditing ? styles.personal__label_active : ''}`}>
              {field}
            </span>
            <input
              type={field === 'email' ? 'email' : field === 'age' || field === 'phone' ? 'number' : 'text'}
              name={field}
              value={isEditing ? formData[field] : user[field]}
              onChange={handleChange}
              disabled={!isEditing || isSaving}
              className={`${styles.personal__input} ${isEditing ? styles.personal__input_editable : ''}`}
            />
            <ErrorMessage message={errors[field]} />
          </label>
        ))}
        {isEditing ? (
          <div className={styles.personal__actions}>
            <ErrorMessage message={errors.general} />
            <button
              type="submit"
              disabled={isSaving || !isValid}
              onClick={handleSubmit}
              className={`${styles.personal__button} ${isSaving ? styles.personal__button_saving : ''}`}
            >
              {isSaving ? 'Saving...' : 'Save changes'}
            </button>
            <button
              className={`${styles.personal__button} ${styles.personal__button_cancel}`}
              disabled={isSaving}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={`${styles.personal__button} ${styles.personal__button_edit}`}
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
      </form>
    </article>
  );
};

export default PersonalInfo;