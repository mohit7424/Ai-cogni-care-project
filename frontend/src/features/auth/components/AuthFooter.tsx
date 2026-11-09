'use client';

import React from 'react';
import Link from 'next/link';

interface AuthFooterProps {
  text: string;
  linkText: string;
  linkHref: string;
}

export default function AuthFooter({ text, linkText, linkHref }: AuthFooterProps) {
  return (
    <p className="text-center text-sm text-gray-500 mt-6">
      {text}{' '}
      <Link
        href={linkHref}
        className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-150 underline-offset-2 hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
}
