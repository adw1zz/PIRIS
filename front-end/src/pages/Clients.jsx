import React, { useEffect, useState } from "react";
import "../styles/clients-page.scss";
import "../styles/loaders.scss"
import { getClients, newClient, updateClient, deleteClients } from '../services/clients-service';
import { useDispatch, useSelector } from "react-redux";
import { updatePagination } from "../store/reducers/clients-reducer";
import { ClientFieldsMap } from "./client-map";

const Clients = () => {

    const clients = useSelector(state => state.clientsData.clients);
    const pagination = useSelector(state => state.clientsData.pagination);
    const loading = useSelector(state => state.clientsData.loading);
    const [totalPageCount, setTotalPageCount] = useState(0);

    const [toDelete, setToDelete] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        const handleDeleteKey = (event) => {
            if (event.key === 'Delete') {
                dispatch(deleteClients(toDelete))
                dispatch(getClients(pagination))
            }
        };
        window.addEventListener('keydown', handleDeleteKey);
        dispatch(getClients(pagination));
        return () => {
            window.removeEventListener('keydown', handleDeleteKey);
        };
    }, [])

    const selectHandle = (id) => {
        const prev = [...toDelete];
        const ind = prev.indexOf(id);
        if (ind < 0) {
            prev.push(id);
            setToDelete(prev);
            document.getElementById(id).style = 'background-color: #969696fd;';
        } else {
            prev.splice(ind, 1);
            setToDelete(prev)
            document.getElementById(id).style = 'background-color: none';
        }
    }

    useEffect(() => {
        if (pagination.total_count > 0) {
            setTotalPageCount(Math.ceil(pagination.total_count / pagination.limit))
        }
    }, [pagination])

    const nextPage = (e) => {
        if (pagination.page < totalPageCount) {

        }
    }

    const prevPage = (e) => {
        if (pagination.page > 1) {
            dispatch(updatePagination({ ...pagination, page: pagination.page1 - 1 }))
        }
    }

    return (
        <div className="clients-page">
            <div className="header">
                Список клиентов
            </div>
            <div className="clients-grid-block">
                {loading
                    ? <div className="load"><span className="get-clients-loader"></span></div>
                    : <div className="clients-grid-container">
                        <div className="clients">
                            <div className="client-header">
                                {clients.length > 0
                                    ? Object.keys(clients[0]).map((key, index) => {
                                        if (ClientFieldsMap.has(key)) {
                                            return <div title={ClientFieldsMap.get(key)} id={index} key={index}>{ClientFieldsMap.get(key)}</div>
                                        }
                                    })
                                    : <></>
                                }
                            </div>
                            {clients?.map((client, index) => {
                                return <div className="client" id={client.id} onClick={() => selectHandle(client.id)} key={client.id}>
                                    {Object.keys(client).map((key, index) => {
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