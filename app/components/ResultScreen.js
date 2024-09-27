// src/components/ResultScreen.js

import React from "react";

const traits = {
  "나의 사감선생님": {
    title: "세련된 지적쟁이, 사감선생님",
    feature:
      "이 캐릭터는 사감선생님의 모습으로, 비판적이고, 통제하는 성향이 강하다. ‘완벽하지 않으면 아무 가치도 없다’는 신념을 가지고 있는 캐릭터. 작은 실수나 불완전한 점을 절대 용납하지 않으며, 실수를 극단적으로 확대하여 불안과 두려움을 심어준다.",
    visual:
      "매끄럽고 균형잡힌 몸매에 늘 잘 꾸며지고 정갈한 모습이다. 흠집 하나 없을 것 같은 머리 스타일과 옷 스타일로 차가운 눈빛과 날카로움이 특징이다. 항상 주위를 날카롭게 관찰한다. 손과 발은 모두 길고, 손에는 깃펜 모양의 펜이나 돋보기를 들고 있어서, 미세한 실수를 찾아내서 가차없이 비판하는 도구로 사용될 수 있다.",
    keywords: ["완벽", "비판", "엄격", "두려움 조성"],
    whispers: [
      "지금은 준비가 덜 되었어",
      "아직 완벽하지 않아",
      "이 정도로는 부족해",
      "좀 더 준비가 필요해",
      "실패하면 망해",
    ],
    impacts: [
      "무언가를 시도하지 못하게 하고, 스스로 의심하게 만든다",
      "실수만 계속 떠올라서 자신감을 잃게 된다.",
      "새로운 도전을 하려는 순간, 완벽한 상황만 기다린다.",
      ">> 도전을 연기하게 만든다.",
    ],
    solution:
      "자기 자신을 있는 그대로 받아들이고, 완벽할 필요 없다는 생각으로 여러가지 시도와 도전하는 법을 배우면 서서히 힘이 약해질 수 있다.",
    strength: "",
  },
  "스마일 마스크": {
    title: "튀지 않게 움직이는 그림자, 검은망토",
    feature:
      "이 캐릭터는 어두색의 망토를 입고, 얼굴과 눈, 입이 거의 보이지 않게 망토로 자신의 정체성을 숨긴다. 사람들을 불편하지 않게 하기 위해, 있는 듯 없는 듯한 존재감을 나타내는 것이 특징이다. 잘 드러나진 않지만, 시도때도 없이 등장해  ‘말하지 마' ‘친절해야지’ 라고 무언의 명령을 내려서, 솔직하지 못하게 만드는 캐릭터다.",
    visual:
      "작고 유연하게 움직이는 망토 캐릭터로 최대한 자신의 모습을 빠르게 숨길 수 있는 것이 특징이다. 얼굴도 보일 듯 말듯하게 망토를 움직일 수 있고, 연기처럼 공간을 자유롭게 움직이며, 매우 은밀하게 움직여서 존재감이 거의 느껴지지 않는다.",
    keywords: ["침묵", "불안 조성", "보호자 행세", "방어"],
    whispers: [
      "말하면 후회할거야",
      "그 말 듣고 상대가 널 어떻게 생각할거 같아?",
      "침묵이 가장 안전해. 조용히 있어",
      "솔직히 말하면 문제가 생길거야",
      "너가 무슨말을 해서 불편해지면 어떻게 책임질건데?",
    ],
    impacts: [
      "솔직하게 말하고 표현하려는 의지를 얼어붙게 만들어, 결국 아무말도 못하게 하며, 타인에게 자연스럽게 끌려다니게 만든다.",
      "친절한 얼굴로 타인을 대하게 만들며, 내가 원하는 것을 말하지 못하게 한다.",
      "침묵이 가장 안전하다고 말하며, 솔직한 관계와 자기 표현의 기회를 빼앗아 가는 존대.",
    ],
    solution:
      "자기의 감정을 인정하고, 솔직함이 위험하지 않다는 것을 깨닫게 되면, 솔직해도 안전한 관계를 경험하면 캐릭터가 힘을 잃게 된다. ",
    strength: "",
  },
  "관심에 목마른, 스포터 라이트": {
    title: "관심에 목마른 주인공, 스포터라이터",
    feature:
      "이 캐릭터는 타인의 관심에 지나치게 예민하고, 타인의 관심이 곧 자신에 대한 존재감이라 자신을 많이 꾸미는 경향이 있습니다. 자연스러운 행동에는 자신이 없고, 꾸며지고 기획된 상황에 스스로를 두고, 타인이 이에 몰입하게 만든다.",
    visual:
      "화려한 의상을 입고, 커다란 리본이나 보석들이 자신을 빛나게 해주는 캐릭터다. 옷은 항상 반짝여서 많은 사람들의 주목을 받기 좋다. 얼굴도 인형처럼 화려하고 눈에 튀는 메이크업을 하고 있고, 과하게 항상 웃고 있는 모양을 하지만 어색하다. 거울을 늘 가지고 다니며, 자신의 모습을 실시간 체크한다.",
    keywords: ["과도한 의식", "과장", "불안", "부자연스러움", "인정욕구"],
    whispers: [
      "모두가 널 지켜보고 있어",
      "주목받지 못하면 넌 잊혀질 거야",
      "이렇게 하면 사람들이 널 더 좋아할 거야",
      "관심이 사라지면, 너 존재는 사라질거야",
      "다른 사람보다 더 뛰어나야, 사랑받을 거야",
    ],
    impacts: [
      "항상 자신의 모습을 의식하게 만들어, 끊임없이 꾸미게 한다.",
      "다른 사람들보다 주목받지 못하면, 자신의 존재가 희석된다고 느껴서, 자신이 늘 더 빛나고 더 눈에 띄어야한다는 압박을 느낀다.",
      "타인에게 칭찬받기 위한 행동이 가장 중요하다.",
    ],
    solution:
      "자신의 가치를 스스로 인정하고, 외부의 시선이 아닌 내면의 기준으로 자신을 평가하기 시작하면, 주목의 인형사는 점차 그 힘을 잃게 됩니다.",
    strength: "",
  },
  "무기력한 넝마 히피": {
    title: "고통을 피하는 도망자, 넝마를 쓴 히피",
    feature:
      "이 캐릭터는 자기 자신이 가장 부족하고, 이미 패배한 루저라고 생각한다. 타고나길 가진게 없다고 생각하며, 스스로를 낮게 바라보는 캐릭터이다. 애초에 잘하는게 없다는 생각으로 모든 시도를 꺽어버린다.",
    visual:
      "구부정하고 작게 몸을 웅크리고 있고, 세상 모든 짐을 짊어진 것처럼 힘든 모습을 하고 있다. 움직임도 매우 느리고 무겁고, 옷 또한 무채색의 낡고 해진 천의 옷을 입고 있다.",
    keywords: ["비판", "불안", "자존감 저하", "평가절하"],
    whispers: [
      "이건 네 수준에 맞지 않아",
      "넌 부족해",
      "다른 사람들보다 뒤쳐져 있어",
      "애초에 재능이 없잖아",
      "저 사람은 저렇게 잘하는데 넌 그 반도 못해",
      "시작해봐야 소용없어",
      "넌 아무리 해도 성공할 수 없어",
      "해봤자 아무도 인정하지 않을거야",
    ],
    impacts: [
      "부정적으로 자기 자신을 바라보게 만들어, 자신을 끊임없이 의심하고 낮춘다.",
      "시간이 갈 수록 자존감이 떨어져서 아주 사소한 것조차 자기는 잘 할 수 없다는 생각을 하게 만들며, 타고나길 가진 것이 없다고 생각하게 만든다.",
      "실패와 좌절을 해보기도 전에, 기억을 왜곡해 새로운 시도를 못하게 만든다.",
    ],
    solution:
      "자신의 가치를 깨닫고, 스스로를 긍정적으로 바라보기 시작하면 그 힘을 잃게 된다. ",
    strength: "",
  },
  "합리화-카멜레온": {
    title: "요리조리 잘 피하는 눈치왕, 카멜레온",
    feature:
      "이 캐릭터는 책임을 회피하고 끊임없이 다른 사람이나 상황탓을 하며 자신이 처한 문제를 피한다. 카멜레온처럼 상황에 따라 자신의 반응과 말을 바꿔 상황을 모면하는특징이 있다. 스스로 책임지는 것을 회피하고, 도전을 피하는 것에 능하다.",
    visual:
      "보호막 같은 옷을 입고 있으며, 색깔이 때때로 바뀌며, 입은 늘 작은 미소를 띄고 있고 진실하진 않다. 교묘하게 다른 타인을 속이려는 의도를 가지고 있으며, 타인에 따라 표정을 그대로 따라하거나, 다른 사람의 모습으로 바꿔서 상황 모면이 쉬운 모습이다. 손은 자기 주머니에 넣거나 숨겨져 있고, 늘 타인의 반응을 주시한다.",
    keywords: ["남탓", "상황탓", "합리화", "핑계", "숨는 기술"],
    whispers: [
      "내 잘못이 아니야, 그 사람이 더 나빴어",
      "내가 이래서 실패한 건 모두 저 사람 때문이야",
      "지금 상황이 나빠서 어쩔 수 없어",
      "여건이 나아지면 그때 시작해",
      "나는 원래 이 일을 잘 못해",
      "이건 내 능력 밖이야, 그래서 어쩔 수 없었어",
    ],
    impacts: [
      "자신의 잘못을 인정하지 않고 타인이나 환경을 탓하는 습관을 형성해서 스스로 보호하려고 한다.",
      "자신을 돌이켜볼 기회를 주지 않고, 책임져야할 상황이 올 때마다 재빠르게 몸을 숨기거나 뒤로 물러나며, 환경 탓 상황 탓 남 탓으로 상황을 모면한다.",
      "무엇보다 상황을 왜곡하는 면이 점차 강화되어, 현실을 있는 그대로 보지 못한다.",
    ],
    solution:
      "자신의 책임을 인식하고, 회고하며 실수로부터 배우려는 의지를 키우게 되면 이 캐릭터는 점차 힘을 잃는다.",
    strength: "",
  },
};

function ResultScreen({ scores, onRestart }) {
  const maxScore = Math.max(...Object.values(scores));

  const result = Object.keys(scores).find((key) => scores[key] === maxScore);
  const trait = traits[result];

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
            onClick={onRestart}
            className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            다시 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultScreen;
