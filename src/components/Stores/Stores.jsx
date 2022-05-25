import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';
import Autocomplete from "react-google-autocomplete";
import ping from './../../assets/market_pin.png'
import pingGiraffas from './../../assets/pin_giraffas.png'
import { GOOGLE_API_KEY } from '../../config';
import { Icon } from './../Common';
import Store from './Store/Store';
import MapGiraffas from './../../assets/MapGirrafas.JPG'
import {
    fetchStoresByAddress,
    setRemoveSelectedStoreByAddress,
    setRemoveStoresByAddress,
    setSelectedStoreByAddress,
    getLatitudeLongitude,
} from '../../redux/actions/stores';
import {
    CustomIcon,
    H1,
    H2,
    Subtitle,
    Title,
    Span,
    CustomButton
} from './styles';

const AnyReactComponent = ({ text }) => (
    <img key={text} src={ping} width="30" alt={text} />
);

const StoreReactComponent = ({ text }) => (
    <img key={text} src={pingGiraffas} width="30" alt={text}/>
);

function Stores(props) {
    const {
        stores,
        fetchStoresByAddress,
        selectedStore,
        setRemoveSelectedStoreByAddress,
        setRemoveStoresByAddress,
        setSelectedStoreByAddress,
        getLatitudeLongitude,
    } = props;
    const [center, setCenter] = useState({ lat: 59.95, lng: 30.33 })
    const [zoom, setZoom] = useState(11)
    const [places, setPlaces] = useState([])
    const [maps, setMaps] = useState(null)
    const [map, setMap] = useState(null)

    useEffect(() => {
        setRemoveSelectedStoreByAddress(null)
        setRemoveStoresByAddress(null)
    }, [
        setRemoveSelectedStoreByAddress,
        setRemoveStoresByAddress
    ])

    const getMapBounds = (map, maps, places) => {
        const bounds = new maps.LatLngBounds();

        places.forEach((place) => {
            bounds.extend(new maps.LatLng(
                place.lat,
                place.lng,
            ));
        });
        return bounds;
    };

    const bindResizeListener = (map, maps, bounds) => {
        maps.event.addDomListenerOnce(map, 'idle', () => {
            maps.event.addDomListener(window, 'resize', () => {
                map.fitBounds(bounds);
            });
        });
    };

    const apiIsLoaded = (map, maps, places) => {
        console.log({ map, maps, places })
        const bounds = getMapBounds(map, maps, places);
        map.fitBounds(bounds);
        bindResizeListener(map, maps, bounds);
    };

    const handleStoresByAddress = (places) => {
        const lat = places?.geometry && places?.geometry?.location && places?.geometry?.location?.lat()
        const long = places?.geometry && places?.geometry?.location && places?.geometry?.location?.lng()

        const ping = [{
            id: "user",
            name: "userAddress",
            lat: lat,
            lng: long
        }]

        setCenter({ lat: lat, lng: long })
        fetchStoresByAddress({ lat, long })
        setZoom(11)
        setPlaces(ping)
    }

    const handlePingStoreLatLong = (store) => {
        getLatitudeLongitude(store.address)
            .then((response) => {
                let points = places

                const storePing = {
                    id: "store",
                    name: store.name,
                    lat: response.data.lat,
                    lng: response.data.lng
                }
                if (points.length > 1) {
                    points.splice(1, 1)
                    const newPlaces = [...points, storePing]
                    setPlaces(newPlaces)
                    apiIsLoaded(map, maps, newPlaces)
                } else {
                    const newPlaces = [...points, storePing]
                    setPlaces(newPlaces)
                    apiIsLoaded(map, maps, newPlaces)
                }
            })
            .catch((e) => console.log(e))
        setSelectedStoreByAddress(store)
        apiIsLoaded(map, maps, places)
    }

    async function handleLocationClick() {
        await navigator.geolocation.getCurrentPosition(async function (position) {
            const {
                latitude,
                longitude
            } = position.coords

						console.log({latitude, longitude})
            setCenter({ lat: latitude, lng: longitude })
            fetchStoresByAddress({ lat: latitude, long: longitude })
            setPlaces([{
                id: "user",
                name: "userAddress",
                lat: latitude,
                lng: longitude
            }])
        })
    }

    return (
        <Container disableGutters component="main" sx={{ pt: 1, pb: 2, pl: 3, pr: 3 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    {places && places.length > 0 ?
                        <div style={{ height: '400px', width: '100%' }}>
                            <GoogleMap
                                apiKey={GOOGLE_API_KEY}
                                center={center}
                                zoom={zoom}
                                refreshSizeToken
                                yesIWantToUseGoogleMapApiInternals
                                onGoogleApiLoaded={({ map, maps }) => {
                                    setMaps(maps)
                                    setMap(map)
                                    apiIsLoaded(map, maps, places)
                                }}
                            >
                                {places.map((place) => {
                                    if (place.id === "store") {
                                        return <StoreReactComponent
                                            key={place.id}
                                            text={place.name}
                                            lat={place.lat}
                                            lng={place.lng}
                                        />
                                    } else {
                                        return <AnyReactComponent
                                            key={place.id}
                                            text={place.name}
                                            lat={place.lat}
                                            lng={place.lng}
                                        />
                                    }
                                })}
                            </GoogleMap>
                        </div> :
                        <img src={MapGiraffas} width="100%" style={{ padding: ".6rem 0 0 0" }} alt="map hover init"/>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <Title>
                        <Subtitle>
                            <CustomIcon>
                                <Icon width={"65px"} height={"65px"} name={"address"} stroke={"primary"} />
                            </CustomIcon>
                        </Subtitle>
                        <Subtitle>
                            <H2>Encontre</H2>
                            <H1>Nossas Lojas</H1>
                        </Subtitle>
                    </Title>
                    <Autocomplete
                        apiKey={GOOGLE_API_KEY}
                        style={{
                            width: "100%",
                            backgroundColor: "#F2F2F2",
                            borderRadius: "15px",
                            border: "1px solid #CECECE",
                            color: "#757575",
                            padding: ".4rem .6rem",
                        }}
                        onPlaceSelected={(place) => {
                            handleStoresByAddress(place);
                        }}
                        options={{
                            fields: ["formatted_address", "geometry.location", "name"],
                            types: ['address'],
                            componentRestrictions: { country: "br" },
                        }}
                        defaultValue="Av. Faria Lima, 1234"
                    />

                    {stores ? <Store stores={stores} handlePingStoreLatLong={handlePingStoreLatLong} selectedStore={selectedStore} /> : null}

                    {!stores ? <>
                        <Span>OU</Span>
                        <CustomButton onClick={() => handleLocationClick()}>
                            <CustomIcon className='geo'>
                                <Icon width={"25px"} height={"25px"} name={"geolocalization"} stroke={"primary"} />
                            </CustomIcon>
                            <span>Ativar geolocalização</span>
                        </CustomButton>
                    </> : null}
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        stores: state.stores.stores,
        selectedStore: state.stores.selectedStore,
        markets: state.stores.markets
    };
}

export default connect(
    mapStateToProps, {
    fetchStoresByAddress,
    setRemoveSelectedStoreByAddress,
    setRemoveStoresByAddress,
    setSelectedStoreByAddress,
    getLatitudeLongitude,
})(Stores);
