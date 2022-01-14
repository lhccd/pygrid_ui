import { Layout } from '../components/Layout'
import { Tab } from '../components/Tab-Domain-Settings'
import tw, {styled} from 'twin.macro'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Modal from '../components/Modal'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {getToken, decodeToken} from '../lib/auth'
import {useRouter} from 'next/router'


export default function DomainSettings() {
    return(
        <div tw="font-roboto">
            <Layout>
                <div tw="col-span-12">
                    <div tw="col-span-12 flex items-center">
                        <div tw="flex mb-4">
                            <h1 tw="text-4xl font-rubik">Domain Settings</h1>
                        </div>
                    </div>
                    <p tw="mb-4">Provide contextual information for the Canada Domain node and set structural configurations.</p>
                    <div tw="mb-12 inline-flex">
                        <input tw="p-2 border border-gray-300 rounded-l text-black w-96" id="url" name="url" type="url" placeholder="domain-specific-url.com"/>
                        <button tw="border border-gray-300 bg-gray-100 rounded-r text-gray-800 p-2 whitespace-nowrap" type="button">Copy URL</button>
                    </div>
                    <Tab></Tab>
                </div>
            </Layout>
        </div>
    )
    //     }else{
    //         router.replace('/login')
    //         return null
    //     }
    // }
    // return null
}