import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {
    CustomIcon,
    H1,
    H2,
    Subtitle,
    Title
} from './styles'
import GoogleMap from 'google-map-react';
import Autocomplete from "react-google-autocomplete";
import { fetchStoresByAddress } from '../../redux/actions/stores';
import Ping from './../../assets/market_pin.png'
import { GOOGLE_API_KEY } from '../../config';
import { Icon } from './../Common'
import Store from './Store/Store';

const AnyReactComponent = ({ text }) => (
    <img src={Ping} width="30" />
);

const StoreReactComponent = ({ text }) => (
    <Icon width={"65px"} height={"65px"} name={"pingGiraffas"} stroke={"primary"} />
);

function Stores(props) {
    const { stores, fetchStoresByAddress, selectedStore, locationSelectedStore } = props;
    const [userLatitude, setUserLatitude] = useState(59.955413)
    const [userLongitude, setUserLogintude] = useState(30.337844)
    const [center, setCenter] = useState({ lat: 59.95, lng: 30.33 })
    const [zoom, setZoom] = useState(11)
    const [addressStore, setAddressStore] = useState(null)
    const [storeLatitude, setStoreLatitude] = useState(59.955413)
    const [storeLongitude, setStoreLogintude] = useState(30.337844)
    useEffect(() => {
        if(selectedStore){
            setAddressStore(true)
            setStoreLatitude(setStoreLogintude.lat)
            setStoreLogintude(setStoreLogintude.lng)
        }
    }, [selectedStore])

    const handleStoresByAddress = (places) => {
        const lat = places?.geometry && places?.geometry?.location && places?.geometry?.location?.lat()
        const long = places?.geometry && places?.geometry?.location && places?.geometry?.location?.lng()

        setUserLatitude(lat)
        setUserLogintude(long)
        setCenter({ lat: lat, lng: long })
        setZoom(11)
        fetchStoresByAddress({ lat, long })
    }

    return (
        <Container disableGutters component="main" sx={{ pt: 1, pb: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <div style={{ height: '400px', width: '100%' }}>
                        <GoogleMap
                            apiKey={GOOGLE_API_KEY}
                            center={center}
                            zoom={zoom}
                        >
                            <AnyReactComponent lat={userLatitude} lng={userLongitude} text={'User address'} />
                            {addressStore && <StoreReactComponent lat={storeLatitude} lng={storeLongitude} text={"Store address"} />}
                        </GoogleMap>
                    </div>
                </Grid>
                <Grid item xs={6}>
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
                            padding: ".3rem .6rem",
                        }}
                        onPlaceSelected={(place) => {
                            console.log(place)
                            handleStoresByAddress(place);
                        }}
                        options={{
                            fields: ["formatted_address", "geometry.location", "name"],
                            types: ['address'],
                            componentRestrictions: { country: "br" },
                        }}
                        defaultValue="São Paulo"
                    />

                    <Store stores={stores} />
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        stores: state.stores.stores,
        selectedStore: state.stores.selectedStore,
        locationSelectedStore: state.stores.locationSelectedStore
    };
}

export default connect(
    mapStateToProps, {
    fetchStoresByAddress
})(Stores);