import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import {
    Wrapper
} from './styles'
import { connect } from 'react-redux'

function Highlights(props) {
    const {
        groups
    } = props
    
    return groups && groups.length ? <Wrapper id='home-highlights'>
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
            showThumbs={false}
            showArrows={false}
            swipeable={true}
            preventMovementUntilSwipeScrollTolerance={false}
        >
            {groups && groups.map((mappedItem, index) => {
                const {
                    highlights,
                } = mappedItem

                return highlights && highlights.map((acc, index) => {
                    const key = `highlights-item-${index}`
                    return <img key={key} src={acc.image}></img>
                })

            })}
        </Carousel>
    </Wrapper> : null
}
const mapStateToProps = (state) => {
    return {
        groups: state.ui.groups
    };
}

export default connect(
    mapStateToProps, {   
})(Highlights);