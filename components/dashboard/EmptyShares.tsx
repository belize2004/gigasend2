import React from 'react'

interface Props {
  title: string;
  description: string;
  icon: React.ElementType
};

export default function EmptyShares({ title, description, icon: Icon }: Props) {
  return (
    <div className="text-center py-12">
      <Icon className="mx-auto text-4xl text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
