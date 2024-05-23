import React, { useState, useEffect, useCallback } from 'react';
import { Position, useUpdateNodeInternals, useReactFlow } from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { Slider } from '@radix-ui/themes';
import { CustomHandle, CustomHandleNested } from '../CustomHandle';

export default function RandomNode({ id, data }: { id: string, data: any }) {
  const { setNodes, setEdges, getEdges } = useReactFlow();
  const [sliderValue, setSliderValue] = useState([data.sliderValue || 20]);
  const [numberOfOutputs, setNumberOfOutputs] = useState(data.outputs?.length || calculateOutputs(sliderValue[0]));
  const updateNodeInternals = useUpdateNodeInternals();

  function calculateOutputs(value: number) {
    return Math.round((value / 100) * 10) + 2;
  }

  useEffect(() => {
    const outputs = calculateOutputs(sliderValue[0]);
    setNumberOfOutputs(outputs);

    // Remove edges connected to handles that will be removed
    setEdges((prevEdges) => {
      const updatedEdges = prevEdges.filter(edge => {
        if (edge.sourceHandle) {
          const sourceHandleIndex = parseInt(edge.sourceHandle.split('-')[1]);
          return isNaN(sourceHandleIndex) || sourceHandleIndex < outputs;
        }
        return true;
      });
      updateNodeInternals(id); // Update node internals after removing edges
      return updatedEdges;
    });

    // Update node data
    setNodes((nodes) => nodes.map(node => {
      if (node.id === id) {
        return {
          ...node,
          data: {
            ...node.data,
            sliderValue: sliderValue[0],
            outputs: Array.from({ length: outputs }, (_, i) => `Output ${i + 1}`)
          }
        };
      }
      return node;
    }));

    updateNodeInternals(id);
  }, [sliderValue, id, setNodes, setEdges, updateNodeInternals]);

  const handleSliderChange = useCallback((value: number[]) => {
    setSliderValue(value);
  }, []);

  return (
    <NodeTemplate color='bg-yellow-700' size='md'>
      <NodeHeading title='Random' />
      <NodeBody>
        <Slider
          value={sliderValue}
          onValueChange={handleSliderChange}
          min={0}
          max={100}
          step={1}
          variant="soft"
          className='nodrag'
          color='yellow'
        />
        <div className='flex justify-between'>
          <p>Number of random outputs</p>
          <ul className='text-xs flex flex-col gap-3'>
            {Array.from({ length: numberOfOutputs }).map((_, index) => (
              <li key={index} className='flex items-center justify-end relative pr-1'>
                <div className='uppercase'>{index + 1}</div>
                <CustomHandleNested
                  type="source"
                  position={Position.Right}
                  id={`source-${index}`}
                  ringColor='ring-yellow-500'
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
