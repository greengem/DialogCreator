'use client'
import React, { useState, useEffect } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { Slider } from '@radix-ui/themes';
import { CustomHandle } from '../CustomHandle';

export default function RandomNode({ id } : { id: string }) {
  const [sliderValue, setSliderValue] = useState([20]);
  const updateNodeInternals = useUpdateNodeInternals();

  const calculateOutputs = (value: number) => {
    return Math.round((value / 100) * 10) + 2;
  };

  const numberOfOutputs = calculateOutputs(sliderValue[0]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [numberOfOutputs, id, updateNodeInternals]);

  return (
    <NodeTemplate color='bg-yellow-500' textColor='black' size='md'>
      <NodeHeading title='Random' />
      <NodeBody>
        <Slider 
          value={sliderValue}
          onValueChange={setSliderValue}
          min={0}
          max={100}
          step={1}
          variant="soft"
          className='nodrag'
        />
        <div className='flex justify-between'>
            <p>Number of random outputs</p>
            <ul className='text-xs flex flex-col gap-3'>
            {Array.from({ length: numberOfOutputs }).map((_, index) => (
                <li key={index} className='flex items-center justify-end relative'>
                <div className='uppercase'>{index + 1}</div>
                <Handle 
                    type="source" 
                    position={Position.Right} 
                    id={`source-${index}`}
                    className="w-2 h-2 rounded-full !bg-zinc-600 ring-2 ring-yellow-500 -mr-3" 
                />
                
                </li>
            ))}
            </ul>
        </div>
      </NodeBody>
      <CustomHandle type='target' position={Position.Left} ringColor='ring-yellow-500' />
    </NodeTemplate>
  );
}
