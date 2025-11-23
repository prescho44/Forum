import { useContext, useEffect, useState } from 'react';
import { getUserData } from '../../../services/users.service';
import { AppContext } from '../../store/app.context';
import { Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Avatar = ({ size = 40 }) => {
  const { user } = useContext(AppContext);
  const [userData, setUserData] = useState(null); // Start with null, not an empty string

  useEffect(() => {
    if (user) {
      getUserData(user.uid)
        .then((data) => {
          const avatarUrl = data[Object.keys(data)[0]]?.avatarUrl;
          setUserData(avatarUrl); // Set userData to avatar URL or null if not available
        })
        .catch((error) => console.log(error.message));
    }
  }, [user]);

  return (
    <>
      {userData ? (
        <Image
          src={userData}
          alt="avatar"
          borderRadius="full"
          boxSize={`${size}px`}
        />
      ) : (
        <Image
          src="/path/to/default-avatar.png"
          alt="default avatar"
          borderRadius="full"
          boxSize={`${size}px`}
        />
      )}
    </>
  );
};

Avatar.propTypes = {
  size: PropTypes.number,
};

Avatar.displayName = 'Avatar';
export default Avatar;
