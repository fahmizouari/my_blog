import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import OrganismNavbar from '../../Organisms/OrganismsNavbar/OrganismNavbar';

export function PageHooks() {
  // Déclare une nouvelle variable d'état, qu’on va appeler « count »
  const [count, setCountt] = useState(0);

  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    document.title = `Vous avez cliqué ${count} fois`;
  },[count]);
  return (
    <div>
        <OrganismNavbar/>
      <p>Vous avez cliqué {count} fois</p>
      <Button onClick={() => setCountt(count+1)}>
        Cliquez ici
      </Button>
    </div>
  );
}

