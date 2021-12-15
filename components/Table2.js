import tw from 'twin.macro'

const Table2 = () => (
    <div tw="flex flex-col w-full border-b border-gray-200 shadow py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div tw="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table tw="min-w-full">
                <thead>
                    <tr>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Name</th>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Email</th>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Status</th>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Edit</th>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Delete</th>
                    </tr>
                </thead>

                <tbody tw="bg-white">
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        John Doe
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">john@example.com</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <span
                                tw="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                        </td>

                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            tw="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" tw="w-6 h-6 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
)

export { Table2 }