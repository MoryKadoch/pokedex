//  @mui/material
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";


// simple blue bar margin top with github link 
export default function Footer() {
    return (
        <Box sx={{ bgcolor: "#1976d2", color: "white", p: 2, mt: 2 }}>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant="body1" component="div" sx={{ textAlign: "right" }}>
                            <a href="https://github.com/MoryKadoch/pokedex" style={{ color: "white", textDecoration: "none" }}>@MoryKadoch</a>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}


