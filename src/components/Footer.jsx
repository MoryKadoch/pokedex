import { Box, Container, Grid, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box sx={{ bgcolor: "#1976d2", color: "white", p: 2, mt: 2 }}>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant="body1" component="div" sx={{ textAlign: "right" }}>
                            <a href="https://github.com/MoryKadoch/" style={{ color: "white", textDecoration: "none" }} target="_blank">@MoryKadoch</a>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}