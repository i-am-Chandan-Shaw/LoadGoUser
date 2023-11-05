import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  topContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    marginTop:20
  },
  star: {
    marginHorizontal: 5,
    // textShadowColor: 'rgba(0, 0, 0, 0.3)',
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 1,
  },
  textarea: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  mediumText: {
    fontSize: 18,
    color: '#000'
  },
  boldText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 600
  },
  smallText: {
    fontSize: 14,
    color: '#000',
    alignSelf: 'flex-start'
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom:10
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 5,
    backgroundColor: '#e0e0e0',
  },
  selectedChip: {
    backgroundColor: '#B31312',
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  selectedLabel: {
    color: '#fff',
  },
});

export default style;