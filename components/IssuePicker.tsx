import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Table from './Table';

interface IssueForm {
    org: string;
    repo: string;
}

const IssuePicker = () => {
    const { register, handleSubmit, formState: { errors: formErrors }
    } = useForm<IssueForm>();
    const [org, setOrg] = useState('');
    const [repo, setRepo] = useState('');
    const [showTable, setShowTable] = useState(false);

    const onSubmit = (formData: IssueForm) => {
        setOrg(formData.org);
        setRepo(formData.repo);
        setShowTable(true);
    }

    return (
        <>
            <div className="bg-gray-900 py-20">
                <div className="mx-auto px-6">
                    <h1 className="text-4xl text-white font-bold mb-6">
                        Github issue picker <br className="hidden md:block" />
                        <span className="text-indigo-500">by sarah ozatici</span>
                    </h1>
                    <h4 className="text-white font-bold mb-6">search by organisation and repository to see all open issues</h4>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="flex">
                            <input className="inline w-50 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-4 placeholder-gray-500 mr-2" {...register('org', { required: true })} id="org" placeholder="Organization" />
                            <input className="inline w-50 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-4 placeholder-gray-500 ml-2" {...register('repo', { required: true })} id="repo" placeholder="Repository" />
                            <button className="bg-indigo-600 ounded-md px-4 py-2 font-medium text-white ml-4">Search</button>
                        </div>
                        {(formErrors.repo || formErrors.org) && (
                            <span className="text-red-500" role="alert">Organisation and repository are both required to perform search.</span>
                        )}
                    </form>
                </div>
            </div>
            {showTable && <Table org={org} repo={repo} />}
        </>
    )
}

export default IssuePicker;
