import React from 'react'
import { 
    Card, 
    CardContent, 
    CardMedia, 
    Grid, 
    makeStyles, 
    Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    card: {
        cursor: 'pointer',
        backgroundColor: 'black',
        color: 'white',
        "&:hover": {
            backgroundColor: "rgb(90, 90, 90)"
        }
    },
    cardMedia: {
        margin: "auto",
        width: '130px',
        height: '130px',
    },
    cardContent: {
        textAlign: 'center'
    },
    link: {
        textDecoration: 'none'
    },
}))
export default function PokemonCard(props) {
    const classes = useStyles()
    const { pokemon, image } = props
    const { id, name } = pokemon
    return (
     <Grid item xs={12} sm={2} key={id}>
        <Link to={"/pokemon/" + id} className={classes.link}>
            <Card className={classes.card} >
                <CardMedia className={classes.cardMedia} key={id} image ={image}></CardMedia>
                <CardContent className={classes.cardContent} >
                    <Typography>
                        {name}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
     </Grid>
    )
}
