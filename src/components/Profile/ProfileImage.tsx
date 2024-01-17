import ProfileImageProps from "../../props/ProfileImageProps";
const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl, altText }) => {
  return (
    <img
      className="w-10 h-10 rounded-full max-sm:w-5 max-sm:h-5"
      src={imageUrl}
      alt={altText}
    />
  );
};
export default ProfileImage;
