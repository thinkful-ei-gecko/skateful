import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css'

export default function Card({ skater }) {
    return (
        <div className='Card'>
            <div className='inner'>
                <div className='back'>
                    <h1> {skater.name} </h1>
                    <p> {skater.location} </p>
                    <p> {skater.bio} </p>
                    <p> {skater.instagram} </p>
                    <p> {skater.up_votes} up-votes </p>
                    <button className='Upvote'> up-vote </button> <br />
                    <Link to={{ pathname: `/comments/${skater.id}`,
                                state: {
                                    skater: {skater}
                                }
                            }}> view comments </Link>
                </div>
                <div className='front'>
                    <img className='skater-img' src={skater.img_url} alt={skater.name} style={{height: '200px', width: 'auto'}}/>
                    <h2> {skater.name} </h2>
                    <p> Up Votes: {skater.up_votes} </p>
                </div>
            </div>
        </div>
    )
}

Card.defaultProps = {
    skaters: {},
}