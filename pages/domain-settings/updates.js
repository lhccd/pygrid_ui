import React, {useEffect, useState} from 'react';
import tw, {styled} from 'twin.macro';
import {useForm} from "react-hook-form";
import axios from "axios";
import moment from "moment";
import {useRouter} from "next/router";

export default function Updates(){
    const router = useRouter();
    const [lastUpdated, setLastUpdated] = useState("");
    const [version, setVersion] = useState("");
    const [repo, setRepo] = useState("");
    const [branch, setBranch] = useState("");
    const [hash, setHash] = useState("");
    const { register, handleSubmit, errors, reset } = useForm();

    useEffect(() => {
        getVersion();
    }, []);

    async function getVersion() {
        try{
            const apiRes = await axios({
                method: "GET",
                url: "api/domain-version",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            });

            if(apiRes.status == 200){
                const domain = await apiRes.data;
                setLastUpdated(domain.lastUpdated);
                setVersion(domain.version);
                setHash(domain.hash);
                setRepo(domain.repo);
                setBranch(domain.branch);
            }
            else{
                alert("Couldn't fetch the domain version!");
            }
        }
        catch (error){
            console.error(error);
        }
    }

    async function onUpdate(){
        const body =JSON.stringify({
            repo,
            branch,
            hash
        })
        try{
            const apiRes = await fetch(
                "api/domain-version",
                {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: body
                }
            );

            if(apiRes.status == 200){
                const domain = await apiRes.json();
                console.log(domain);
            }
            else{
                alert("Couldn't update the domain version!");
            }
        }
        catch (error){
            console.log(error);
        }
    }


    return (
        <>
            <div id="domain-box" tw="col-start-3 col-end-11 text-gray-800">
                <div tw="divide-y">
                    <div id="version">
                        <h1 tw="font-bold text-left text-xl my-4 mt-10 font-rubik">Current Version</h1>
                        <div tw="divide-y divide-gray-200 divide-solid">
                            <ul id="domain-info" tw="text-left text-sm mt-4 mb-8">
                                <li tw="py-2" key={lastUpdated.key}>
                                    <a tw="font-bold text-gray-700">Last Updated: </a>
                                    <a tw="font-mono">{moment(lastUpdated).format('YYYY-MMM-DD HH:MM')}</a>
                                </li>
                                <li tw="py-2" key={version.key}>
                                    <a tw="font-bold text-gray-700">Version: </a>
                                    <a tw="font-mono">{version}</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div id="update">
                        <h1 tw="font-bold text-left text-xl mt-8 font-rubik">Update Version</h1>
                        <form tw="col-span-8 my-5" onSubmit={onUpdate}>
                            <div tw="mt-2">
                                <p tw="text-sm text-gray-600">Please enter the [PLACEHOLDER] repository and branch in the fields below then press
                                    “Check for Update” to check for any library updates.</p>
                            </div>
                            <div id="" tw="inline-flex w-full mt-4">
                                <div tw="w-1/2">
                                    <label tw="font-bold text-sm" htmlFor="repo">Repository</label><p tw="pl-1 inline relative bottom-1 text-primary-500 font-bold">*</p><p tw="pl-1 inline relative text-primary-500 text-xs italic">(optional)</p>
                                </div>
                                <div tw="w-1/4">
                                    <label tw="font-bold text-sm" htmlFor="branch">Branch</label><p tw="pl-1 inline relative bottom-1 text-primary-500 font-bold">*</p><p tw="pl-1 inline relative text-primary-500 text-xs italic">(optional)</p>
                                </div>
                                <div tw="w-1/4">
                                    <label tw="font-bold text-sm" htmlFor="commit-hash">Commit Hash</label><p tw="pl-1 inline relative bottom-1 text-primary-500 font-bold">*</p><p tw="pl-1 inline relative text-primary-500 text-xs italic">(optional)</p>
                                </div>
                            </div>
                            <div tw="inline-flex w-full mt-2">
                                <div tw="w-1/2 mr-4">
                                    <input tw="p-2 border border-gray-300 rounded text-black w-full" id="repo" name="repo" type="text" placeholder="Repository"
                                           value={repo} onChange={e => setRepo(e.target.value)}/>
                                </div>
                                <div tw="w-1/4 mr-4">
                                    <input tw="p-2 border border-gray-300 rounded text-black w-full" id="branch" name="branch" type="text" placeholder="Branch"
                                           value={branch} onChange={e => setBranch(e.target.value)}/>
                                </div>
                                <div tw="w-1/4">
                                    <input tw="p-2 border border-gray-300 rounded text-black w-full" id="commit-hash" name="commit-hash" type="text" placeholder="Commit Hash"
                                           value={hash} onChange={e => setHash(e.target.value)}/>
                                </div>
                            </div >
                            <div id="buttons" tw="text-center mt-10 inline-flex content-start whitespace-nowrap">
                                <button tw="bg-primary-500 rounded text-white font-bold py-2 px-2 mr-6" type="button" onClick={onUpdate}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}