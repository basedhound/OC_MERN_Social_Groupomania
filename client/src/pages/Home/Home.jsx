// Components
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import PostShare from "../../components/PostShare/PostShare";
import Posts from "../../components/Post/Posts";
import Online from "../../components/Online/Online";
// Style
import "./home.css";

const Home = () => {
   return (
      <section className="home">
         <div className="home__left">
            <ProfileCard />
         </div>
         <main className="home__center">
            <PostShare />
            <Posts />
         </main>
         <aside className="home__right">
            <Online />
         </aside>
      </section>
   );
};

export default Home;
