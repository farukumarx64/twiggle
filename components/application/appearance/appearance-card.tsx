// components/AppearanceCard.tsx
import { useState } from 'react';
import { Input, Textarea } from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '@/utils/state/actions/userActions';

export const AppearanceCard = () => {
  const dispatch = useDispatch();

  const [profileTitle, setProfileTitle] = useState('');
  const [bio, setBio] = useState('');

  const handleProfileTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileTitle(e.target.value);
    dispatch(updateUserInfo({ profileTitle: e.target.value }));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
    dispatch(updateUserInfo({ bio: e.target.value }));
  };

  return (
    <div className="w-full md:max-w-xl p-6 border-1 flex flex-col justify-center items-center rounded-3xl">
      {/* Avatar and buttons */}
      
      <div className="w-full flex flex-col gap-3 mt-9 mb-3">
        <Input 
          label="Profile Title" 
          value={profileTitle} 
          onChange={handleProfileTitleChange} 
        />
        <Textarea 
          label="Bio" 
          value={bio} 
          onChange={handleBioChange} 
        />
      </div>
      
      {/* Divider and social icons */}
    </div>
  );
};
