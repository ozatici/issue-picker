import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Table from './Table';
import styles from "../styles/issuePicker.module.scss"


const IssuePicker = () => {
    const { register, handleSubmit } = useForm();
    const [org, setOrg] = useState('');
    const [repo, setRepo] = useState('');
    const [showTable, setShowTable] = useState(false);

    const onSubmit = (formData: any) => {
        setOrg(formData.org);
        setRepo(formData.repo);
        setShowTable(true);
    }

    return (
        <>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} >
                <label className={styles.searchTitle}>Organization</label>
                <input className={styles.searchField} {...register('org', {})} id="org" />
                <label className={styles.searchTitle}>Repo</label>
                <input className={styles.searchField} {...register('repo', {})} id="repo" />
                <button className={styles.button}>Search</button>
            </form>
            {showTable && <Table org={org} repo={repo} />}
        </>
    )
}

export default IssuePicker;
