import React, { useEffect, useState } from "react";
import "../styles/clients-page.scss";
import "../styles/loaders.scss"
import { getClients, deleteClients } from '../services/clients-service';
import { useDispatch, useSelector } from "react-redux";
import { updatePagination, updateToDeleteList } from "../store/reducers/clients-reducer";
import { ClientFieldsMap } from "../consts/client";
import FormModalWindow from "./components/FormModalWindow";
import ErrorModalWindow from "../reused/ErrorModalWindow";

const Clients = () => {

    const dispatch = useDispatch();
    const status = useSelector(state => state.clientsData.status);
    const clients = useSelector(state => state.clientsData.clients);
    const pagination = useSelector(state => state.clientsData.pagination);
    const loading = useSelector(state => state.clientsData.loading);
    const [totalPageCount, setTotalPageCount] = useState(1);
    const [dataForModalWindow, setDataForModalWindow] = useState(null);

    const toDelete = useSelector(state => state.clientsData.toDelete);
    const [del, setDel] = useState(false);
    const [showErr, toShowErr] = useState(false);
    const [showEditModal, toShowEditModal] = useState(false);
    const [modified, setModified] = useState(false);

    useEffect(() => {
        const handleKeys = (event) => {
            if (event.key === 'Delete') {
                setDel(true);
            } else if (event.key === 'Insert') {
                setDataForModalWindow({ title: 'Новый клиент', defaultData: {} })
                toShowEditModal(true);
            }
        };
        window.addEventListener('keyup', handleKeys);
        dispatch(getClients(pagination));
        return () => {
            window.removeEventListener('keyup', handleKeys);
        };
    }, [])

    useEffect(() => {
        if (del && toDelete.length > 0) {
            dispatch(deleteClients(toDelete));
            dispatch(updateToDeleteList([]));
            setModified(true);
            setDel(false);
        }
    }, [del])

    useEffect(() => {
        if (modified) {
            dispatch(getClients(pagination));
            setModified(false);
        }
    }, [modified])

    useEffect(() => {
        if (status === 400) {
            toShowErr(true);
        }
    }, [status])

    const selectHandle = (e) => {
        let clientBlock;
        if (e.target.className === 'client') {
            clientBlock = e.target;
        } else {
            clientBlock = e.target.closest('.client');
        }
        const exists = toDelete.indexOf(clientBlock.id);
        const current = [...toDelete];
        if (exists === -1) {
            clientBlock.style = 'background-color: #969696fd;';
            current.push(clientBlock.id);
            dispatch(updateToDeleteList(current));
        } else {
            clientBlock.style = 'background-color: none';
            current.splice(exists, 1);
            dispatch(updateToDeleteList(current));
        }
    }

    const openEditFormModal = (title, defaultData) => {
        setDataForModalWindow({ title, defaultData })
        toShowEditModal(true);
    }

    useEffect(() => {
        if (pagination.total_count > 0) {
            setTotalPageCount(Math.ceil(pagination.total_count / pagination.limit))
        }
    }, [pagination])

    const nextPage = (e) => {
        if (pagination.page < totalPageCount) {
            dispatch(updatePagination({ ...pagination, page: Number(pagination.page) + 1 }))
            setModified(true);
        }
    }

    const prevPage = (e) => {
        if (pagination.page > 1) {
            dispatch(updatePagination({ ...pagination, page: Number(pagination.page) - 1 }))
            setModified(true);
        }
    }

    return (
        <div className="clients-page">
            {showErr
                ? <ErrorModalWindow show={toShowErr} />
                : <></>
            }
            {showEditModal
                ? <FormModalWindow show={toShowEditModal} data={dataForModalWindow} modif={setModified} />
                : <></>
            }
            <div className="header">
                Список клиентов
            </div>
            <div className="clients-grid-block">
                {loading
                    ? <div className="clients-array-load"><span className="get-clients-loader"></span></div>
                    : <div className="clients-grid-container">
                        <div className="clients">
                            <div className="client-header">
                                {Object.keys(ClientFieldsMap).map((key, index) => {
                                    return <div title={ClientFieldsMap[key]} id={index} key={index}>{ClientFieldsMap[key]}</div>
                                })
                                }
                            </div>
                            {clients?.map((client, index) => {
                                return <div className="client" id={client.id} onClick={selectHandle} key={client.id} onDoubleClick={() => openEditFormModal('Редактирование', client)}>
                                    {Object.keys(ClientFieldsMap).map((key, index) => {
                                        if (key !== 'id') {
                                            if (typeof client[key] === 'boolean') {
                                                return <div key={index} >{client[key] ? 'ДА' : 'НЕТ'}</div>
                                            }
                                            return <div title={client[key]} key={index} >{client[key]}</div>
                                        }
                                    })
                                    }
                                </div>
                            })}
                        </div>
                    </div>
                }
            </div>
            <div className="footer">
                <div className="pagination">
                    <button onClick={prevPage}>Предыдущая</button>
                    <div>{pagination.page} .. {totalPageCount}</div>
                    <button onClick={nextPage}>Следующая</button>
                </div>
            </div>
        </div>
    )
}
export default Clients;