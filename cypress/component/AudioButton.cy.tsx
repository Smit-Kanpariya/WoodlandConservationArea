import React from 'react';
import AudioButton from '../../src/components/AudioButton';

describe('AudioButton', () => {
    let audioMock: any;
    let speechSynthesisMock: any;

    beforeEach(() => {
        // Mock Audio
        audioMock = {
            play: cy.stub().as('audioPlay').resolves(),
            pause: cy.stub().as('audioPause'),
            onended: null,
            paused: false, // Default to playing when we check
        };

        // We need to return a new instance or the same instance?
        // The component creates `new Audio()`.
        // Let's return the same mock for simplicity, but reset stubs.

        cy.window().then((win) => {
            cy.stub(win, 'Audio').returns(audioMock);
        });

        // Mock SpeechSynthesis
        speechSynthesisMock = {
            cancel: cy.stub().as('synthCancel'),
            speak: cy.stub().as('synthSpeak'),
            getVoices: () => [],
            speaking: false,
        };

        cy.window().then((win) => {
            // Need to handle read-only property if it exists
            try {
                Object.defineProperty(win, 'speechSynthesis', {
                    value: speechSynthesisMock,
                    writable: true,
                });
            } catch (e) {
                // If it fails, it might be because it's already defined and not configurable.
                // In Cypress component testing, we are in a browser.
                // We might just stub the methods if the object exists.
                if (win.speechSynthesis) {
                    cy.stub(win.speechSynthesis, 'cancel').as('synthCancel');
                    cy.stub(win.speechSynthesis, 'speak').as('synthSpeak');
                    // speaking is a getter
                }
            }

            cy.stub(win, 'SpeechSynthesisUtterance').returns({});
        });
    });

    it('toggles audio on second click', () => {
        cy.mount(<AudioButton text="Test Audio" />);

        // First click: should play
        cy.get('button').click();
        cy.get('@audioPlay').should('have.been.calledOnce');

        // We need to ensure the component thinks it's playing.
        // The component sets `currentAudio = audio` and `currentText = text`.
        // And checks `!currentAudio.paused`.
        // Our mock has `paused: false`.

        // Second click: should pause (toggle off)
        cy.get('button').click();
        cy.get('@audioPause').should('have.been.called');

        // Should NOT call play again (still calledOnce)
        cy.get('@audioPlay').should('have.been.calledOnce');
    });

    it('switches audio when clicking a different button', () => {
        cy.mount(
            <>
                <AudioButton text="Audio 1" />
                <AudioButton text="Audio 2" />
            </>
        );

        // Click first
        cy.get('button[aria-label="Play audio description: Audio 1"]').click();
        cy.get('@audioPlay').should('have.callCount', 1);

        // Click second
        cy.get('button[aria-label="Play audio description: Audio 2"]').click();

        // Should pause the first one
        cy.get('@audioPause').should('have.been.called');

        // Should play the second one
        cy.get('@audioPlay').should('have.callCount', 2);
    });
});
