import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsloading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsloading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsloading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsloading(false);
    }
  }
  async function createCity(newCity) {
    try {
      setIsloading(true);
      // this is just a standard way of sending post request to an API, not relate to React or anything
      // post request will mutate/update the server state/remote state

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // update UI state so the new object immediately gets reflected in our UI
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error creating city.");
    } finally {
      setIsloading(false);
    }
  }
  async function deleteCity(id) {
    try {
      setIsloading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // update UI state so the new object immediately gets reflected in our UI
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error deleting city.");
    } finally {
      setIsloading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
