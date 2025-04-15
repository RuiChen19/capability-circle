'use client';

import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

const questions = [
  { dimension: '核心知识与技能', items: ['...'] },
  { dimension: '认知与理解边界', items: ['...'] },
  { dimension: '自我学习与成长速度', items: ['...'] },
  { dimension: '问题解决与决策能力', items: ['...'] },
  { dimension: '自我认知与理性评估', items: ['...'] },
  { dimension: '持续专注与投入程度', items: ['...'] },
  { dimension: '反馈利用与纠错能力', items: ['...'] },
  { dimension: '圈外风险意识与自我约束', items: ['...'] }
];

export default function Home() {
  const [scores, setScores] = useState(Array(8).fill(5));
  const [showChart, setShowChart] = useState(false);

  const handleScoreChange = (index: number, value: number) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const data = questions.map((q, i) => ({
    subject: q.dimension,
    A: scores[i],
    fullMark: 10,
  }));

  return (
    <main className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>科研能力圈边界自评测试</h1>
      {questions.map((q, i) => (
        <div key={i} className='mb-6'>
          <h2 className='font-semibold mb-2'>{q.dimension}</h2>
          <label className='block mb-1'>请为此维度打分（0-10）：</label>
          <input
            type='number'
            min={0}
            max={10}
            value={scores[i]}
            onChange={(e) => handleScoreChange(i, Number(e.target.value))}
            className='border p-2 rounded w-24'
          />
        </div>
      ))}
      <button onClick={() => setShowChart(true)} className='bg-blue-500 text-white px-4 py-2 rounded'>
        生成能力圈雷达图
      </button>
      {showChart && (
        <div className='mt-12 flex justify-center'>
          <RadarChart cx={250} cy={250} outerRadius={150} width={500} height={500} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey='subject' />
            <PolarRadiusAxis angle={30} domain={[0, 10]} />
            <Radar name='你的能力圈' dataKey='A' stroke='#8884d8' fill='#8884d8' fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </div>
      )}
    </main>
  );
}
