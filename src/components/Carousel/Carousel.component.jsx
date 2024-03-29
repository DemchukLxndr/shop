import React, { Component } from 'react';
import FallbackImage from '../../media/jpg/no-image.jpg';
import './Carousel.style.scss';

export default class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0
        }

        this.changeCarouselImage = this.changeCarouselImage.bind(this);
    }

    changeCarouselImage(direction) {
        const length = this.props.gallery.length;
        const index = this.state.currentIndex;
        let newIndex = 0;

        if (direction === "left") {
            // We don't want negative index, so we go to last index instead
            if (index > 0) {
                newIndex = index - 1;
            }
            else {
                newIndex = length - 1;
            }
        }
        else if (direction === "right") {
            // We don't want to go out of bounds with the index either
            if (index < length - 1) {
                newIndex = index + 1;
            }
            else {
                newIndex = 0;
            }
        }

        this.setState({
            currentIndex: newIndex
        }, () => {
            // Pass
        })
    }

    render() {
        const gallery = this.props.gallery;
        const altTitle = this.props.altTitle;

        return (
            <div className="carousel">
                <div
                    className={`carousel-action left
                        ${gallery.length > 1
                            ? "expanded"
                            : ""}`}
                    onClick={() => {
                        this.changeCarouselImage("left");
                    }}>
                </div>
                <div
                    className={`carousel-action right
                        ${gallery.length > 1
                            ? "expanded"
                            : ""}`}
                    onClick={() => {
                        this.changeCarouselImage("right");
                    }}>
                </div>
                <img
                    src={gallery[this.state.currentIndex]}
                    alt={altTitle}
                    className="carousel-image"
                    onError={(e) => {
                        e.target.src = FallbackImage;
                    }} />
            </div>
        )
    }
}
