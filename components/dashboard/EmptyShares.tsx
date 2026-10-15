import React from 'react'
import Link from '@/components/compat/Link';

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
      <p className="text-gray-600 mb-6">{description}</p>
      <Link
        href="/transfer"
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md"
      >
        Start New Transfer
      </Link>
    </div>
  )
}
