"use client";

import results from "../../data/result";

function TraitsPage({ params }) {
  const { trait: t } = params;

  const traitKey = Object.keys(results).find((key) => results[key].slug === t);
  if (!traitKey) {
    console.error(`Trait not found for slug: ${t}`);
    return null;
  }
  const trait = results[traitKey];

  const shareMessage = () => {
    // window.Kakao.Share.sendScrap({
    //   requestUrl: "https://offtherecord-survey.vercel.app",
    // });
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "설문조사 하러가기",
        description: "나의 특성은 무엇일까?",
        imageUrl:
          "https://i.ibb.co/r4LLyXR/Clean-Shot-2024-09-19-at-09-27-46-2x.png",
        link: {
          mobileWebUrl: "https://offtherecord-survey.vercel.app",
          webUrl: "https://offtherecord-survey.vercel.app",
        },
      },
      buttons: [
        {
          title: "나도 해보기",
          link: {
            mobileWebUrl: `https://offtherecord-survey.vercel.app/traits/${trait.slug}`,
            webUrl: `https://offtherecord-survey.vercel.app/traits/${trait.slug}`,
          },
        },
      ],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          {trait.title}
        </h1>

        <p className="text-lg text-gray-700 mb-2">{trait.feature}</p>
        <p className="text-lg text-gray-700 mb-2">{trait.feature}</p>
        <p className="text-lg text-gray-700 mb-6">{trait.visual}</p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">키워드</h2>
          <ul className="list-disc list-inside space-y-1">
            {trait.keywords.map((keyword, index) => (
              <li key={index} className="text-gray-600">
                {keyword}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            나에게 이런 말로 속삭여요!
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {trait.whispers.map((whisper, index) => (
              <li key={index} className="text-gray-600">
                {whisper}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Impacts!
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {trait.impacts.map((impact, index) => (
              <li key={index} className="text-gray-600">
                {impact}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Solution!
          </h2>
          <p className="text-lg text-gray-700">{trait.solution}</p>
        </div>

        <div className="text-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            다시 시작하기
          </button>

          <button
            id="kakaotalk-sharing-btn"
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
            onClick={shareMessage}
          >
            카카오톡으로 공유
          </button>
        </div>
      </div>
    </div>
  );
}

export default TraitsPage;
