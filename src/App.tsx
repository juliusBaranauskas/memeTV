import { Component, Show, createEffect, createMemo, createSignal } from "solid-js";
import useRedditApi, { Post } from './hooks/useRedditApi';
import { createStorageSignal } from "@solid-primitives/storage";
import styles from './App.module.css';

const defaultSubreddits = [
  'memes',
  'aww',
  'ProgrammerHumor',
  'funny',
  'eyebleach',
  'mademesmile',
];

const useLocalStorageValueWithDefault = (key: string, initialValue: string) => {
  const [valueAccessor] = createStorageSignal<string>(key, initialValue);
  return () => valueAccessor() ?? initialValue;
}

const misingAppIdValue = "MISSING app id";
const misingAppSecretValue = "MISSING app secret";

const App: Component = () => {
  const appId = useLocalStorageValueWithDefault("app_id", misingAppIdValue);
  const appSecret = useLocalStorageValueWithDefault("app_secret", misingAppSecretValue);
  const subredditsStr = useLocalStorageValueWithDefault(
    "subreddits",
    defaultSubreddits.join(",")
  );
  const subreddits = createMemo(
    () =>
      subredditsStr()
        ?.split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0) ?? defaultSubreddits
  );

  const { get, isReady: isRedditApiReady } = useRedditApi({ appId, appSecret });

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

    const randomizedSubreddit = subreddits()[Math.floor(Math.random()*(subreddits().length - 1))];

    get(randomizedSubreddit, `/r/${randomizedSubreddit}/hot`, {
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
    if (!document.hidden) {
      fetchSomeMemes();
      return;
    }
    
    if (!firstMeme()) return;

    setPreviouslyShown(prev => {
      // only store limited amount of previous posts since continuation token
      // should already ensure same posts are not queried again
      if (prev.length > 499) {
        prev.shift();
      }

      return prev.concat(firstMeme()!.id)
    });

    // remove post from list of memes to be shown
    setPosts(prev => prev.slice(1));
  };

  createEffect(() => {
    document.addEventListener('visibilitychange', tabVisibilityHandler);
    return () => document.removeEventListener('visibilitychange', tabVisibilityHandler);
  });

  createEffect(() => {
    if (posts().length < 2) {
      fetchSomeMemes();
    }
  });

  const handleFailedToLoadImage = () => {
    // ignore the image on failed request
    setPosts(prev => prev.slice(1));
  };

  const currentPost = () => {
    const currentFirstMeme = firstMeme();
    if (!currentFirstMeme) return <img src='https://http.cat/404' class={styles.memeImage} alt="image not found" />

    return <img src={currentFirstMeme.url} class={styles.memeImage} alt="meme" onError={handleFailedToLoadImage} />;
  };

  const firstMemeTitle = () => {
    const currentFirstMeme = firstMeme();
    return currentFirstMeme?.title;
  };

  const firstMemeAuthor = () => {
    const currentFirstMeme = firstMeme();
    return currentFirstMeme?.authorName;
  };

  const firstMemeScore = () => {
    const currentFirstMeme = firstMeme();
    return currentFirstMeme?.score;
  };

  const firstMemeSubreddit = () => {
    const currentFirstMeme = firstMeme();
    return currentFirstMeme?.subreddit;
  };

  return (
    <>
      <Show when={appId() !== misingAppIdValue && appSecret() !== misingAppSecretValue} fallback={<div>Missing credentials</div>}>
        <div class={styles.App}>
          <PostHeader title={firstMemeTitle} authorName={firstMemeAuthor} score={firstMemeScore} subreddit={firstMemeSubreddit} />
            {currentPost()}
        </div>
      </Show>
    </>
  );
};

export default App;

type PostHeaderProps = {
  title: () => string | undefined;
  authorName: () => string | undefined;
  subreddit: () => string | undefined;
  score: () => number | undefined;
};

const PostHeader = ({ title, score, authorName, subreddit }: PostHeaderProps) => {

  return (
    <div class={styles.postHeader}>
      <div id={styles.ratingWrapper}>
        <span>
          {score() ?? 0 > 0 ? '^' : '\\/'}{score()}
        </span>
      </div>
      <div id={styles.headerText}>
        <span>
          {title()}
        </span>
      </div>
      <div id={styles.metaDataWrapper}>
        <span>
          {'r/' + subreddit()}
        </span>
        <span>
          {'u/' + authorName()}
        </span>
      </div>
    </div>
  );
}
