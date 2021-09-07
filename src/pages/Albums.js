import React, { useState, useEffect } from "react";
import "./Albums.css"
import ReactLoading from 'react-loading';

import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import options from "../configs/Options";

function Albums() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        // Get all photos available
        let photosList = []
        await fetch("https://jsonplaceholder.typicode.com/photos")
            .then(response => response.json())
            .then(json => photosList = json);

        // Get all albums available
        let albumsList = []
        await fetch("https://jsonplaceholder.typicode.com/albums")
            .then(response => response.json())
            .then(json => albumsList = json);

        // Loads all photos inside the album
        for (var i = 0; i < photosList.length; i++) {
            albumsList.find((obj, j) => {
                if (obj.id === photosList[i].albumId) {
                    let albumPhotosList = albumsList[j].photosList === undefined ? [] : albumsList[j].photosList;
                    albumPhotosList.push({ id: photosList[i].id, title: photosList[i].title, url: photosList[i].url, thumbnailUrl: photosList[i].thumbnailUrl });
                    albumsList[j] = { userId: albumsList[j].userId, id: albumsList[j].id, title: albumsList[j].title, photosList: albumPhotosList };
                    return true; // Stop searching
                }
            });
        }

        // Get all users available
        let usersList = [];
        await fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(json => usersList = json);

        // Loads all albums inside user
        for (var i = 0; i < albumsList.length; i++) {
            usersList.find((obj, j) => {
                if (obj.id === albumsList[i].userId) {
                    let userAlbumsList = usersList[j].albumsList === undefined ? [] : usersList[j].albumsList;
                    userAlbumsList.push({ id: albumsList[i].id, title: albumsList[i].title, photosList: albumsList[i].photosList });
                    usersList[j] = { id: usersList[j].id, name: usersList[j].name, username: usersList[j].username, albumsList: userAlbumsList };
                    return true; // Stop searching
                }
            })
        }

        setData(usersList)

        setLoading(false);
    }, []);

    function showDataPhotos(row) {
        let returnData = [];

        data.find((obj) => {
            obj.albumsList.find((internalObj) => {
                if (internalObj.id === row.id) {
                    returnData = internalObj.photosList;
                    return true;
                }
            })
        })
        return returnData;
    }

    function urlFormatter(cell, row) {
        return (
            <img src={cell} style={{ maxWidth: '25%' }} />
        );
    }

    const expandInternalRow = {
        onlyOneExpanding: true,
        renderer: row => (
            <>
                <h2>Comentários no post</h2>
                <BootstrapTable
                    keyField="id"
                    data={showDataPhotos(row)}
                    columns={[
                        {
                            dataField: 'title',
                            text: 'Título',
                            headerStyle: {
                                backgroundColor: 'plum',
                                color: "black"
                            },
                            sort: true,
                        },
                        {
                            dataField: 'url',
                            text: 'Url',
                            headerStyle: {
                                backgroundColor: 'plum',
                                color: "black"
                            },
                            sort: true,
                            formatter: urlFormatter
                        },
                        {
                            dataField: 'thumbnailUrl',
                            text: 'ThumbnailUrl',
                            headerStyle: {
                                backgroundColor: 'plum',
                                color: "black"
                            },
                            sort: true,
                            formatter: urlFormatter
                        }
                    ]}
                    bordered={true}
                    bootstrap4={true}
                    noDataIndication="Não há dados"
                    condensed={true}
                    rowStyle={{ backgroundColor: '#f1daf1', border: '2px solid #d0c7d0' }}
                />
            </>
        ),
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            if (isAnyExpands) {
                return <b>-</b>;
            }
            return <b>...</b>;
        },
        expandColumnRenderer: ({ expanded }) => {
            if (expanded) {
                return (
                    <b>▲</b>
                );
            }
            return (
                <b>▼</b>
            );
        },
    };

    function showDataAlbums(row) {
        let returnData = [];

        data.find((obj) => {
            if (obj.id === row.id) {
                returnData = obj.albumsList;
                return true;
            }
        })
        return returnData;
    }

    const expandRow = {
        onlyOneExpanding: true,
        renderer: row => (
            <>
                <h2>Álbuns criados</h2>
                <BootstrapTable
                    keyField="id"
                    data={showDataAlbums(row)}
                    columns={[
                        {
                            dataField: 'title',
                            text: 'Título',
                            headerStyle: {
                                backgroundColor: 'plum',
                                color: "black"
                            },
                            sort: true,
                        }
                    ]}
                    expandRow={expandInternalRow}
                    bordered={true}
                    bootstrap4={true}
                    noDataIndication="Não há dados"
                    condensed={true}
                    rowStyle={{ backgroundColor: '#f1daf1', border: '2px solid #d0c7d0' }}
                    pagination={paginationFactory(options)}
                />
            </>
        ),
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            if (isAnyExpands) {
                return <b>-</b>;
            }
            return <b>...</b>;
        },
        expandColumnRenderer: ({ expanded }) => {
            if (expanded) {
                return (
                    <b>▲</b>
                );
            }
            return (
                <b>▼</b>
            );
        },
    };

    return (
        <>
            {loading && <ReactLoading type={"cubes"} color={"red"} height={667} width={375} />}
            {!loading && <div className="albums">
                <h2>Usuários</h2>
                <BootstrapTable
                    keyField="id"
                    data={data}
                    columns={[
                        {
                            dataField: 'name',
                            text: 'Nome',
                            headerStyle: {
                                backgroundColor: 'plum',
                                color: "black"
                            },
                            sort: true,
                        },
                        {
                            dataField: 'username',
                            text: "Nome de usuário",
                            headerStyle: {
                                backgroundColor: 'plum',
                                color: "black"
                            },
                            sort: true,
                        }
                    ]}
                    expandRow={expandRow}
                    bordered={false}
                    bootstrap4={true}
                    noDataIndication="Não há dados"
                    condensed={true}
                    rowStyle={{ backgroundColor: '#f1daf1', border: '2px solid #d0c7d0' }}
                    pagination={paginationFactory(options)}
                />
            </div>}
        </>
    );
}

export default Albums;