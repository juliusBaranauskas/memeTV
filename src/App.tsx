import { Component, createEffect, createSignal } from 'solid-js';
import useRedditApi, { Post } from './hooks/useRedditApi';
import styles from './App.module.css';

const subreddits = [
  'memes',
  'aww',
  'ProgrammerHumor',
  'okbuddyretard',
  'funny',
  'eyebleach',
  'mademesmile',
];

const App: Component = () => {
  const appId = localStorage.getItem('app_id');
  const appSecret = localStorage.getItem('app_secret');
  const { get, isReady } = useRedditApi({ appId: appId!, appSecret: appSecret! });

  const [posts, setPosts] = createSignal<Post[]>([]);
  const [previouslyShown, setPreviouslyShown] = createSignal<string[]>([]);
  const [alreadyFetched, setAlreadyFetched] = createSignal(false);

  const firstMeme = () => posts().length === 0 ? undefined : posts()[0];

  const updatePostList = (retrievedPosts: Post[]) => {
    // filter already fetched
    let newPosts = retrievedPosts.filter(post => posts().find(oldPost => oldPost.id === post.id) === undefined);
    
    // filter memes already shown
    newPosts = newPosts.filter(post => !previouslyShown().includes(post.id));
    setPosts(prev => prev.concat(newPosts));
  };

  const fetchSomeMemes = (count: number = 3) => {
    if (!isReady()) return;

    const randomizedSubreddit = subreddits[Math.floor(Math.random()*(subreddits.length - 1))];

    get(randomizedSubreddit, `/r/${randomizedSubreddit}/rising`, {
      g: 'GLOBAL',
      timeframe: 'day',
      limit: `${count}`,
    }).then(updatePostList);
  };

  createEffect(() => {
    if (!isReady() || alreadyFetched()) return;

    fetchSomeMemes();
    setAlreadyFetched(true);
  });

  createEffect(() => console.log(posts()));

  const tabVisibilityHandler = () => {
    if (document.hidden) {
      console.log('tab deactivated, archiving meme that was shown');
      if (!firstMeme()) return;

      setPreviouslyShown(prev => prev.concat(firstMeme()!.id))

      // remove post from list of memes to be shown
      setPosts(prev => prev.slice(1));
    } else {
        console.log('tab activated');
        fetchSomeMemes();
    }
  };

  createEffect(() => {
    document.addEventListener('visibilitychange', tabVisibilityHandler);
    return () => document.removeEventListener('visibilitychange', tabVisibilityHandler);
  });


  const currentPost = () => {
    if (!firstMeme()) return <p>Loading your memes...</p>

    return <img src={firstMeme()!.url} class={styles.memeImage} alt="meme" />;
  };

  if (!appId || !appSecret) return <div>Missing credentials</div>;

  return (
    <div class={styles.App}>
      <div class={styles.postHeader}></div>
        {currentPost()}
    </div>
  );
};

export default App;
