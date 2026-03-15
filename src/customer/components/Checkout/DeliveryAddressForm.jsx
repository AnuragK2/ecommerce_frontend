import { Grid, Button, Box, TextField } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";
import { api } from "../../../config/apiConfig";

const DeliveryAddressForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {auth}=useSelector(store=>store);
  const objectAddresses = useMemo(() => {
    const rawAddresses =
      (Array.isArray(auth.user?.addresses) && auth.user.addresses) ||
      (Array.isArray(auth.user?.address) && auth.user.address) ||
      [];
    return rawAddresses.filter((a) => a && typeof a === "object");
  }, [auth.user?.addresses, auth.user?.address]);
  const [savedAddresses, setSavedAddresses] = useState(objectAddresses);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const fetchedAllRef = useRef(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mobile: "",
  });
  const ADDRESS_ENDPOINT = process.env.REACT_APP_ADDRESS_ENDPOINT;

  // keep state in sync when auth updates
  useEffect(() => {
    const local = (() => {
      try {
        const raw = localStorage.getItem("savedAddresses");
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    })();

    const merged = [
      ...objectAddresses,
      ...local.filter(
        (loc) =>
          !objectAddresses.some(
            (obj) =>
              (obj._id && loc._id && obj._id === loc._id) ||
              (obj.streetAddress === loc.streetAddress &&
                obj.zipCode === loc.zipCode)
          )
      ),
    ];
    setSavedAddresses(merged);
  }, [objectAddresses]);

  // if we only have IDs, optionally fetch all addresses once (if endpoint provided)
  useEffect(() => {
    if (savedAddresses.length > 0 || fetchedAllRef.current) return;
    if (!ADDRESS_ENDPOINT) return; // avoid hitting unknown endpoints
    const rawAddresses =
      (Array.isArray(auth.user?.addresses) && auth.user.addresses) ||
      (Array.isArray(auth.user?.address) && auth.user.address) ||
      [];
    const hasOnlyIds = rawAddresses.length > 0 && rawAddresses.every((a) => typeof a === "string");
    if (!hasOnlyIds) return;

    const fetchAll = async () => {
      setLoadingAddresses(true);
      try {
        const res = await api.get(ADDRESS_ENDPOINT);
        const list =
          Array.isArray(res.data) ? res.data : res.data?.addresses || [];
        const objects = list.filter((a) => a && typeof a === "object");
        if (objects.length > 0) setSavedAddresses(objects);
      } catch (e) {
        // swallow; we'll show empty state
      }
      fetchedAllRef.current = true;
      setLoadingAddresses(false);
    };
    fetchAll();
  }, [auth.user?.addresses, auth.user?.address, savedAddresses.length, ADDRESS_ENDPOINT]);

  const handleAddressSelect = (address) => {
    setFormValues({
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      streetAddress: address.streetAddress || "",
      city: address.city || "",
      state: address.state || "",
      zipCode: address.zipCode || "",
      mobile: address.mobile || "",
    });
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliverSaved = (address) => {
    // Go straight to order creation with the chosen saved address
    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const address = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            streetAddress: formValues.streetAddress,
            city: formValues.city,
            state: formValues.state,
            zipCode: formValues.zipCode,
            mobile: formValues.mobile
        }
        // show the freshly added address immediately in the saved list and persist locally
        setSavedAddresses((prev) => {
          const updated = [...prev, address];
          localStorage.setItem("savedAddresses", JSON.stringify(updated));
          return updated;
        });
        const orderData = {address, navigate}
        dispatch(createOrder(orderData))
        console.log("address",orderData)
    }
  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          lg={5}
          className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          <div className="p-5 py-7 border-b cursor-pointer">
            {loadingAddresses ? (
              <p className="text-sm text-gray-500">Loading saved addresses...</p>
            ) : savedAddresses.length === 0 ? (
              <p className="text-sm text-gray-500">
                No saved addresses found. Please add one below.
              </p>
            ) : (
              savedAddresses.map((item, idx) => (
                <div key={item._id || idx} className="mb-4">
                  <AddressCard address={item} />
                  <Button
                    sx={{ mt: 1, bgcolor: "RGB(145 85 253)" }}
                    size="small"
                    variant="contained"
                    onClick={() => handleDeliverSaved(item)}
                  >
                    Deliver Here
                  </Button>
                </div>
              ))
            )}
          </div>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Box className="border rounded-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    value={formValues.firstName}
                    onChange={handleFieldChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                    value={formValues.lastName}
                    onChange={handleFieldChange}
                  />
                              </Grid>
                              
                              <Grid item xs={12} >
                  <TextField
                    required
                    id="streetAddress"
                    name="streetAddress"
                    label="Address"
                    fullWidth
                    autoComplete="address"
                    multiline
                    rows={4}
                    value={formValues.streetAddress}
                    onChange={handleFieldChange}
                  />
                              </Grid>
                              
                  <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="Village/Town/City"
                    fullWidth
                    value={formValues.city}
                    onChange={handleFieldChange}
                    />
                              </Grid>
                              
                              <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    value={formValues.state}
                    onChange={handleFieldChange}
                    />
                              </Grid>
                             <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zipCode"
                    name="zipCode"
                    label="Zip/Postal Code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    value={formValues.zipCode}
                    onChange={handleFieldChange}
                    />
                              </Grid> 
                              
                              <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="mobile"
                    name="mobile"
                    label="Phone Number"
                    fullWidth
                    value={formValues.mobile}
                    onChange={handleFieldChange}
                    />
                              </Grid> 
                              
                              <Grid item xs={12} sm={6}>
                                   <Button
              sx={{ py:1.5, mt: 2, bgcolor: "RGB(145 85 253)" }}
              size="large"
                                      variant="contained"
                                      type='submit'
            >
              Deliver Here
            </Button>
                </Grid> 

              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
