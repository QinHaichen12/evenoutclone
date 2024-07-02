"use client";
import { JSX, SVGProps, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  AcademicCapIcon,
  CheckCircleIcon,
  HandRaisedIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SunIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

const stats = [
  { label: "Business was founded", value: "2012" },
  { label: "People on the team", value: "120+" },
  { label: "Users on the platform", value: "250k" },
  { label: "Paid out to creators", value: "$70M" },
];
const values = [
  {
    name: "Encourage Free Speech",
    description:
      "We believe in open discussion and freedom of speech within respectful boundaries.",
    icon: HandRaisedIcon,
  },
  {
    name: "Foster Community",
    description:
      "Our goal is to build a supportive and engaged community where everyone feels welcome.",
    icon: UserGroupIcon,
  },
  {
    name: "Promote Learning",
    description:
      "We aim to be a platform for knowledge sharing and collective learning.",
    icon: AcademicCapIcon,
  },
  {
    name: "Respect Diversity",
    description:
      "We value diverse perspectives and promote inclusivity in all our discussions.",
    icon: SparklesIcon,
  },
];
const benefits = [
  "Connect with like-minded individuals",
  "Share and gain knowledge",
  "Participate in engaging discussions",
  "Access exclusive content",
  "Receive community support",
  "Enjoy a safe and respectful environment",
];

export default function Example() {
  return (
    <div className="bg-gray-900">
      <Header />

      <main className="relative isolate">
        {/* Background */}
        <div
          className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>

        {/* Header section */}
        <div className="px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Welcome to the Forum
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Join our community to engage in meaningful discussions, share
              knowledge, and connect with like-minded individuals.
            </p>
          </div>
        </div>

        {/* Content section */}
        <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 lg:max-w-none lg:grid-cols-2">
              <div>
                <p>
                  Our forum provides a platform for people from all walks of
                  life to come together and discuss a wide range of topics.
                  Whether you are looking to share your expertise, learn from
                  others, or simply engage in stimulating conversations, you
                  will find a welcoming and supportive community here.
                </p>
                <p className="mt-8">
                  We value respectful dialogue and diverse perspectives. Our
                  moderators are here to ensure that the forum remains a safe
                  and inclusive space for everyone. Join us and be a part of
                  something special.
                </p>
              </div>
              <div>
                <p>
                  From technology and science to arts and culture, our
                  categories cover a vast array of subjects. Dive into
                  discussions that pique your interest, ask questions, and get
                  insights from community members who are passionate about the
                  same topics as you.
                </p>
                <p className="mt-8">
                  We also host regular events, such as Q&A sessions with
                  experts, community challenges, and more. Stay tuned and
                  participate to make the most of your forum experience.
                </p>
              </div>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4">
              {stats.map((stat, statIdx) => (
                <div
                  key={statIdx}
                  className="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6"
                >
                  <dt className="text-base leading-7 text-gray-300">
                    {stat.label}
                  </dt>
                  <dd className="text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Image section */}
        <div className="relative aspect-[9/4] w-full xl:rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Values section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our values
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We believe in creating a community where everyone feels valued and
              respected. Here are the core values that guide us:
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
            {values.map((value) => (
              <div key={value.name} className="relative pl-9">
                <dt className="inline font-semibold text-white">
                  <value.icon
                    className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                    aria-hidden="true"
                  />
                  {value.name}
                </dt>{" "}
                <dd className="inline">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA section */}
        <div className="relative isolate -z-10 mt-32 sm:mt-40">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
              <div className="relative h-96 w-full flex-none rounded-2xl overflow-hidden shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm">
                <Image
                  src="https://images.unsplash.com/photo-1519338381761-c7523edc1f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl"
                />
              </div>
              <div className="w-full flex-auto">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Join our team
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Passionate about building communities? We are always looking
                  for dedicated individuals to join our team. Explore our job
                  openings and apply today.
                </p>
                <ul
                  role="list"
                  className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-white sm:grid-cols-2"
                >
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-x-3">
                      <CheckCircleIcon
                        className="h-7 w-5 flex-none"
                        aria-hidden="true"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex">
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-indigo-400"
                  >
                    See our job postings <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
