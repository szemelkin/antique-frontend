import React from 'react';
import { useEffect, useState } from 'react';

import '../../Lots/LotsCard/movies-card/movies-card.css'

import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const TableAllUsers = (item) => {
    

    return (
            <div className="movies-card">

            <table>
                

                <tbody>
                    <tr className="movies-card__text">
                        <th>Логин</th>
                        <th>Email</th>
                        <th>ID</th>
                    </tr>
                    <tr className="movies-card__text">
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item._id}</td>
                    </tr>
                    
                </tbody>
            </table>

            </div>
    )
};

export default TableAllUsers;