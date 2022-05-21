import styled from 'styled-components'

export const Wrapper = styled.div`
  flex: none;

  .carousel-root {
    min-width: 280px;
    width: 100%;
    max-width: 100%;

    > .carousel {
      &.carousel-slider {
        overflow: unset;
      }

      .slide {
        background: none;

        > img {
          width: 100%;
          height: auto;
        }
      }

      .carousel-status {
        display: none;
      }

      .thumbs-wrapper {
        display: none;
      }
    }
  }
`