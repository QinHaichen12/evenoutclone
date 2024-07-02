"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { createClient } from '@/utils/supabase/client'; 

const supabase = createClient();

interface Post {
  post_id: string;
  title: string;
  content: string;
  created_at: string;
  expires_at: string;
  isOpen: boolean;
  choices: string[];
  created_by: string;
}

interface Prediction {
  prediction: string;
  is_correct?: boolean;
  post_id: string;
  user_id: string;
}

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [predictions, setPredictions] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (postsError) {
        setError(postsError.message);
        return;
      }

      if (postsData) {
        setPosts(postsData);
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: predictionsData, error: predictionsError } = await supabase
        .from("predictions")
        .select("post_id, prediction")
        .eq("user_id", user.id);

      if (predictionsError) {
        setError(predictionsError.message);
        return;
      }

      if (predictionsData) {
        const userPredictions = predictionsData.reduce((acc, prediction) => {
          acc[prediction.post_id] = prediction.prediction;
          return acc;
        }, {});
        setPredictions(userPredictions);
      }
    };

    fetchPosts();
  }, []);

  const handlePrediction = async (postId: string, choice: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("You must be logged in to cast a prediction.");
        return;
      }

      const { data: existingPrediction, error: fetchError } = await supabase
        .from("predictions")
        .select("*")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        setError(fetchError.message);
        return;
      }

      let response;
      if (existingPrediction) {
        response = await supabase
          .from("predictions")
          .update({ prediction: choice })
          .eq("post_id", postId)
          .eq("user_id", user.id);
      } else {
        response = await supabase
          .from("predictions")
          .insert([{ post_id: postId, user_id: user.id, prediction: choice }]);
      }

      const { error: updateError } = response;
      if (updateError) {
        setError(updateError.message);
        return;
      }

      setPredictions({ ...predictions, [postId]: choice });

      alert("Prediction cast successfully!");
    } catch (error) {
      console.error(error);
      setError("An unknown error occurred.");
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200">
      <Header />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Prediction Challenges
            </h2>
            <p className="mt-2 text-lg leading-8">
              Cast your predictions on various challenges.
            </p>
            <button
              onClick={() => router.push('/create_post')}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400"
            >
              Create Post
            </button>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 dark:border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.post_id}
                className="flex max-w-xl flex-col items-start justify-between bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm transition-transform transform hover:scale-105"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={post.created_at}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    {new Date(post.created_at).toLocaleDateString()}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                    {post.title}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {post.content}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <Image
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-800"
                    width={40}
                    height={40}
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold">
                      Author Placeholder
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Cast Your Prediction</h4>
                  <div className="mt-2 grid grid-cols-1 gap-2">
                    {post.choices.map((choice, index) => (
                      <button
                        key={index}
                        onClick={() => handlePrediction(post.post_id, choice)}
                        className={`w-full py-2 px-4 rounded-md hover:bg-indigo-500 ${predictions[post.post_id] === choice ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-black'}`}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
