// React
import React from "react";
// Redux
// Components
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import PostCreate from "../../components/PostCreate/PostCreate";
import Posts from "../../components/Post/Posts";
import Online from "../../components/Online/Online";
// Style
import "./profile.css";

const Profile = () => {
   // const user/profile
   // const fetch/dispatch user posts

   return (
      <section className="profile">
         <article className="profile__left">
            <ProfileCard id="" isOwnProfile="" />
         </article>
         <article className="profile__center">
            {<PostCreate />}
            <Posts/>
         </article>
         <article className="profile__right">
            <Online />
         </article>
      </section>
   );
};

export default Profile;
