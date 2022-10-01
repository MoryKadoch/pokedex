import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button, Modal, FormControl, TextField, Input } from "@mui/material";
import { useState } from "react";

export default function Header() {

    // function for display search modal contact form
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        let subject = document.getElementById("subject").value;
        let message = document.getElementById("message").value;
        if (subject !== "" && message !== "") {
            window.location.href = `mailto:contact@kadoch.dev?subject=${subject}&body=${message}`;
        }
        else {
            alert("Please fill all the fields");
        }
    }

    return (
        <AppBar position="static">
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                    <Button onClick={handleClose} sx={{ float: "right", color: "black" }}>x</Button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Contact me
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <Input label="Subject" id="subject" />
                            <TextField label="Message" multiline rows={4} placeholder="Your message to thank me" sx={{ width: "100%", mt: 2 }} id="message" />
                            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>Submit</Button>
                        </FormControl>
                    </Typography>
                </Box>
            </Modal>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <NavLink to="/pokemons" style={{ textDecoration: "none", color: "white" }}>
                        <Box>
                            <img src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png" alt="pokedex" width="100" height="40" />
                            <Button onClick={handleOpen} variant="contained" sx={{ ml: 2, mt: 1, float: "right" }}>
                                Contact me
                            </Button>
                        </Box>
                    </NavLink>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
