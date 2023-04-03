import { Component, createEffect, createSignal } from 'solid-js';
import useRedditApi, { Post } from './hooks/useRedditApi';
import styles from './App.module.css';

const subreddits = [
  'memes',
  'aww',
  'ProgrammerHumor',
  'funny',
  'eyebleach',
  'mademesmile',
];

const App: Component = () => {
  const appId = localStorage.getItem('app_id');
  const appSecret = localStorage.getItem('app_secret');
  const { get, isReady: isRedditApiReady } = useRedditApi({ appId: appId!, appSecret: appSecret! });

  const [posts, setPosts] = createSignal<Post[]>([]);
  const [previouslyShown, setPreviouslyShown] = createSignal<string[]>([]);
  const [alreadyFetched, setAlreadyFetched] = createSignal(false);

  const firstMeme = () => posts().length === 0 ? undefined : posts()[0];

  const updatePostList = (retrievedPosts: Post[]) => {
    // filter already fetched
    const existingPosts = posts();
    let newPosts = retrievedPosts.filter(post => existingPosts.find(oldPost => oldPost.id === post.id) === undefined);
    
    // filter memes already shown
    newPosts = newPosts.filter(post => !previouslyShown().includes(post.id));

    if (newPosts.length + existingPosts.length > 100) {
      // remove the posts older than a day
      const dayAgo = new Date().getUTCMilliseconds() - 1000 * 60 * 60 * 24;
      let remainingPosts = existingPosts.filter(p => p.createdAtUTC > dayAgo);

      newPosts = remainingPosts.concat(newPosts).sort((a, b) => b.score - a.score).slice(0, 99);
      setPosts(newPosts);
      return;
    }
    setPosts(prev => prev.concat(newPosts));
  };

  const fetchSomeMemes = (count: number = 3) => {
    if (!isRedditApiReady()) return;

    const randomizedSubreddit = subreddits[Math.floor(Math.random()*(subreddits.length - 1))];

    get(randomizedSubreddit, `/r/${randomizedSubreddit}/rising`, {
      g: 'GLOBAL',
      timeframe: 'day',
      limit: `${count}`,
    }).then(updatePostList);
  };

  createEffect(() => {
    if (!isRedditApiReady() || alreadyFetched()) return;

    fetchSomeMemes();
    setAlreadyFetched(true);
  });

  const tabVisibilityHandler = () => {
    if (document.hidden) {

      if (!firstMeme()) return;

      setPreviouslyShown(prev => prev.concat(firstMeme()!.id))

      // remove post from list of memes to be shown
      setPosts(prev => prev.slice(1));
    } else {
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
