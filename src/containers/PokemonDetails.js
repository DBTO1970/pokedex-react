import React, { Component } from 'react'
import axios from 'axios'
import { POKEMON_API_URL } from '../config'
import { Box, Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { connect } from 'react-redux'
import { toggleFavorite } from '../redux/actions'

const styles = (theme) => ({
    pokedexContainer: {
        height: '84vh',
        backgroundColor: 'black',
        color: 'white',
        marginTop: 75,
        textAlign: 'center',
        borderRadius: 5,
        paddingTop: 30
    },
    textTitle: {
        textTransform: "upperCase",
        fontFamily: 'Fantasy'
    },
    pokemonImage: {
        width: "170px",
        height: "170px"
    },
    pokemonInfoContainer: {
        bottom: 60,
        position: 'absolute',
        width: "100%"
    },
    seperator: {
        height: "0.01mm",
        width: "95%"
    },
    favorite: {
        height: 50,
        width: 50,
        marginTop: 15
    },
    text: {
        fontSize: 30
    }
})

class PokemonDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon: null
        }
    }

    componentDidMount() {
        const { match} = this.props
        const { id } = match?.params
        axios.get(POKEMON_API_URL + "/" + id).then((response) => {
            if(response.status >= 200 && response.status < 300) {
                console.log(response.data)
                this.setState({pokemon: response.data})
            }
        })
    }

    favoriteChecker(pokemon) {
        let found = false
        this.props.favorites?.map((p) => {
            if(p.id === pokemon.id) {
                found = true
            }
        })
        return found
    }
    render() {
        console.log(this.props.favorites)
        const { classes } = this.props
        const { pokemon } = this.state
        if(pokemon) {
            const { name, sprites, height, weight, types } = pokemon
            console.log(sprites) // use to see prototypes for images
            return (
                <Box>
                    <Box className={classes.pokedexContainer}>
                        <Typography variant='h1' className={classes.textTitle}>
                            { name }
                        </Typography>
                        <img className={classes.pokemonImage} src={sprites.front_default} alt={name}/>
                        <Box className={classes.pokemonInfoContainer}>
                            <hr className={classes.seperator} />
                            <Grid container>
                                <Grid item md={1} >
                                    <Button className={classes.favorite} onClick={() => this.props.toggleFavorite(pokemon)}>
                                        <FavoriteIcon style={{ color: this.favoriteChecker(pokemon) ? "red" : "white", fontSize: 45 }} />
                                    </Button>
                                    
                                </Grid>
                                <Grid item md={2} >
                                    <Typography className={classes.text}>
                                        Name:
                                        <br />{name}
                                    </Typography>
                                </Grid>
                                <Grid item md={2} >
                                    <Typography className={classes.text}>
                                        Height:
                                        <br />{height}m
                                    </Typography>
                                </Grid>
                                <Grid item md={2} >
                                    <Typography className={classes.text}>
                                        Weight:
                                        <br />{weight}kg
                                    </Typography>
                                </Grid>
                               
                                    {types.map((pokemonType) => {
                                        const { name } = pokemonType.type
                                        return (
                                            <Grid item md={2}>
                                                <Typography className={classes.text}>
                                                    Type:
                                                    <br />
                                                    {name}
                                                </Typography>
                                            </Grid>
                                        )
                                    })}
                                
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            )

        } else {
            return <CircularProgress />
        }
    }
}
const mapStateToProps = (state) => ({
    favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
    toggleFavorite: (pokemon) => dispatch(toggleFavorite(pokemon))
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PokemonDetails));






