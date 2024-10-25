<template>
    <v-container class="d-flex justify-center align-center" fluid>
      <v-row justify="center">
        <!-- Player 1 Card -->
        <v-col cols="12" lg="6">
          <v-card
            :class="{ 'highlight-border': selectedCharacter === 1 }"
            outlined
            class="text-center"
            @click="selectCharacter(1)"
          >
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" aspect-ratio="1.75" class="mb-2"></v-img>
            <v-row>
              <v-col>Character 1</v-col>
              <v-col>Details</v-col>
            </v-row>
          </v-card>
        </v-col>
        
        <!-- Player 2 Card -->
        <v-col cols="12" lg="6">
          <v-card
            :class="{ 'highlight-border': selectedCharacter === 2 }"
            outlined
            class="text-center"
            @click="selectCharacter(2)"
          >
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" aspect-ratio="1.75" class="mb-2"></v-img>
            <v-row>
              <v-col>Character 2</v-col>
              <v-col>Details</v-col>
            </v-row>
          </v-card>
        </v-col>
        
        <v-btn color="grey" to="/">Back</v-btn>
        <v-btn color="primary" @click="openDialog" class="ml-4">Play</v-btn>
  
        <!-- Confirmation Dialog -->
        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title class="headline">Confirm Your Choice</v-card-title>
            <v-card-text>Are you sure you want to proceed with Character {{ selectedCharacter }}?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary" text @click="confirmChoice">Sure</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  
  // Track the selected character
  const selectedCharacter = ref(1)
  const dialog = ref(false)
  const router = useRouter()
  
  // Function to change character on mouse click
  const selectCharacter = (character) => {
    selectedCharacter.value = character
  }
  
  // Function to open confirmation dialog
  const openDialog = () => {
    dialog.value = true
  }
  
  // Function to confirm choice and redirect to 'battle_loading'
  const confirmChoice = () => {
    localStorage.setItem('selectedCharacter', selectedCharacter.value)
    console.log(localStorage.getItem('selectedCharacter'))
    dialog.value = false
    router.push({ name: '/battle_area' })
  }
  
  // Function to handle keyboard arrow keys
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      selectedCharacter.value = Math.max(1, selectedCharacter.value - 1)
    } else if (event.key === 'ArrowRight') {
      selectedCharacter.value = Math.min(2, selectedCharacter.value + 1)
    }
  }
  
  // Mount and cleanup event listeners
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
  </script>
  
  <style scoped>
  /* Canvas-like border styling for selected card */
  .highlight-border {
    border: 4px solid #ff9d00;
    transition: border-color 0.3s;
  }
  </style>
  