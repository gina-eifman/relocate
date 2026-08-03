import React from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useCollections } from '../../hooks/useCollections';
import { useFavourites } from '../../hooks/useFavourites';
import PersonalInfo from '../../components/profile/PersonalInfo/PersonalInfo';
import Favourites from '../../components/profile/Favourites/Favourites';
import Collections from '../../components/profile/Collections/Collections';
import styles from './Profile.module.css';
import Loader from '../../components/common/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const Profile = ({ countries, errMessagePersonal, errMessageFavourites, errMessageCollections }) => {
  const navigate = useNavigate();
  const {
    user,
    isLoading,
    updateUser
  } = useProfile();

  const {
    collections,
    addCollection,
    updateCollection,
    removeCollection,
    addCountryToCollection,
    removeCountryFromCollection
  } = useCollections();

  const {
    liked,
    toggleFavourite,
    isLiked,
    getFavouriteId
  } = useFavourites();

  if (isLoading) return <Loader />;

  return (
    <section className={styles.profile}>
      <h1 className={styles.profile__title}>PROFILE</h1>
      <div className={styles.profile__container}>
        <PersonalInfo user={user} onUpdate={updateUser} isLoading={isLoading} errMessage={errMessagePersonal} />
        <div className={styles.profile__right}>
          <Favourites
            countries={countries}
            liked={liked}
            toggleFavourite={toggleFavourite}
            isLiked={isLiked}
            getFavouriteId={getFavouriteId}
            errMessage={errMessageFavourites}
          />
          <Collections
            countries={countries}
            collections={collections}
            onAddCollection={addCollection}
            onUpdateCollection={updateCollection}
            onDeleteCollection={removeCollection}
            onAddCountry={addCountryToCollection}
            onRemoveCountry={removeCountryFromCollection}
            errMessage={errMessageCollections}
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;